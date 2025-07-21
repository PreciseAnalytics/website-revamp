import type { NextApiRequest, NextApiResponse } from 'next';
import * as nodemailer from 'nodemailer';

// Rate limiting storage (in production, use Redis or database)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Clean up old entries every hour
setInterval(() => {
  const now = Date.now();
  for (const [key, value] of rateLimitMap.entries()) {
    if (now > value.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}, 3600000);

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5;

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  const userLimit = rateLimitMap.get(ip)!;
  
  if (now > userLimit.resetTime) {
    userLimit.count = 1;
    userLimit.resetTime = now + windowMs;
    return true;
  }

  if (userLimit.count >= maxRequests) {
    return false;
  }

  userLimit.count++;
  return true;
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePhone(phone: string): boolean {
  const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  // Get client IP for rate limiting
  const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
  const ip = Array.isArray(clientIp) ? clientIp[0] : clientIp;

  // Apply rate limiting
  if (!rateLimit(ip)) {
    return res.status(429).json({ 
      success: false, 
      message: 'Too many requests. Please try again later.' 
    });
  }

  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      company,
      jobTitle,
      projectType,
      budget,
      timeline,
      message
    } = req.body;

    // Validation
    const errors: string[] = [];
    
    if (!firstName?.trim()) errors.push('First name is required');
    if (!lastName?.trim()) errors.push('Last name is required');
    if (!email?.trim()) errors.push('Email is required');
    if (!validateEmail(email)) errors.push('Invalid email format');
    if (!phone?.trim()) errors.push('Phone number is required');
    if (!validatePhone(phone)) errors.push('Invalid phone number format');
    if (!message?.trim()) errors.push('Message is required');

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    // Sanitize inputs
    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: sanitizeInput(email),
      phone: sanitizeInput(phone),
      company: sanitizeInput(company || ''),
      jobTitle: sanitizeInput(jobTitle || ''),
      projectType: sanitizeInput(projectType || ''),
      budget: sanitizeInput(budget || ''),
      timeline: sanitizeInput(timeline || ''),
      message: sanitizeInput(message)
    };

    // Create email transporter - USING WORKING CONFIGURATION
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify transporter configuration
    try {
      await transporter.verify();
    } catch (error) {
      console.error('SMTP configuration error:', error);
      return res.status(500).json({
        success: false,
        message: 'Email service configuration error'
      });
    }

    const currentTime = new Date().toLocaleString('en-US', {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    // Email to your team
    const teamEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: linear-gradient(135deg, #FF7D00, #FFA500); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Precise Analytics Website</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="margin-bottom: 25px;">
            <h2 style="color: #FF7D00; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #FF7D00; padding-bottom: 5px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Name:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.firstName} ${sanitizedData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #666;"><a href="mailto:${sanitizedData.email}" style="color: #FF7D00; text-decoration: none;">${sanitizedData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Phone:</td>
                <td style="padding: 8px 0; color: #666;"><a href="tel:${sanitizedData.phone}" style="color: #FF7D00; text-decoration: none;">${sanitizedData.phone}</a></td>
              </tr>
              ${sanitizedData.company ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Company:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.company}</td>
              </tr>
              ` : ''}
              ${sanitizedData.jobTitle ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Job Title:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.jobTitle}</td>
              </tr>
              ` : ''}
            </table>
          </div>

          ${(sanitizedData.projectType || sanitizedData.budget || sanitizedData.timeline) ? `
          <div style="margin-bottom: 25px;">
            <h2 style="color: #FF7D00; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #FF7D00; padding-bottom: 5px;">Project Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              ${sanitizedData.projectType ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 120px;">Project Type:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.projectType}</td>
              </tr>
              ` : ''}
              ${sanitizedData.budget ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Budget:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.budget}</td>
              </tr>
              ` : ''}
              ${sanitizedData.timeline ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Timeline:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.timeline}</td>
              </tr>
              ` : ''}
            </table>
          </div>
          ` : ''}

          <div style="margin-bottom: 25px;">
            <h2 style="color: #FF7D00; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #FF7D00; padding-bottom: 5px;">Message</h2>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #FF7D00;">
              <p style="margin: 0; color: #333; line-height: 1.6; white-space: pre-wrap;">${sanitizedData.message}</p>
            </div>
          </div>

          <div style="background: #f8f9fa; padding: 15px; border-radius: 6px; text-align: center; margin-top: 25px;">
            <p style="margin: 0; color: #666; font-size: 14px;">
              <strong>Submitted:</strong> ${currentTime} (EST)<br>
              <strong>IP Address:</strong> ${ip}
            </p>
          </div>
        </div>
      </div>
    `;

    // Auto-reply to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: linear-gradient(135deg, #FF7D00, #FFA500); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Thank You for Contacting Us!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Precise Analytics</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">
            Dear ${sanitizedData.firstName},
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for reaching out to Precise Analytics! We've received your message and appreciate your interest in our data analytics solutions.
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 25px 0;">
            Our team will review your inquiry and respond within 24 hours. In the meantime, feel free to explore our services or contact us directly if you have any urgent questions.
          </p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #FF7D00; margin: 25px 0;">
            <h3 style="color: #FF7D00; margin: 0 0 10px 0; font-size: 18px;">Your Message Summary:</h3>
            <p style="margin: 5px 0; color: #666;"><strong>Subject:</strong> ${sanitizedData.projectType || 'General Inquiry'}</p>
            <p style="margin: 5px 0; color: #666;"><strong>Message:</strong></p>
            <p style="margin: 10px 0; color: #333; line-height: 1.6; font-style: italic;">"${sanitizedData.message.substring(0, 200)}${sanitizedData.message.length > 200 ? '...' : ''}"</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://preciseanalytics.io" style="background: linear-gradient(135deg, #FF7D00, #FFA500); color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Visit Our Website</a>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 25px 0 0 0;">
            Best regards,<br>
            <strong>The Precise Analytics Team</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            This is an automated response. Please do not reply to this email.<br>
            For immediate assistance, contact us at <a href="mailto:contact@preciseanalytics.io" style="color: #FF7D00;">contact@preciseanalytics.io</a>
          </p>
        </div>
      </div>
    `;

    // Send email to your team - USING CORRECT VARIABLES
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `New Contact: ${sanitizedData.firstName} ${sanitizedData.lastName} - ${sanitizedData.projectType || 'General Inquiry'}`,
      html: teamEmailHtml,
      replyTo: sanitizedData.email
    });

    // Send auto-reply to customer - USING CORRECT VARIABLES
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: sanitizedData.email,
      subject: 'Thank you for contacting Precise Analytics',
      html: customerEmailHtml
    });

    // Log successful submission
    console.log(`Contact form submission from ${sanitizedData.email} at ${currentTime}`);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! We\'ll respond within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please try again or contact us directly.'
    });
  }
}