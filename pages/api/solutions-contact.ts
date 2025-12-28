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
      company,
      solution,
      timeline,
      message
    } = req.body;

    // Validation
    const errors: string[] = [];
    
    if (!firstName?.trim()) errors.push('First name is required');
    if (!lastName?.trim()) errors.push('Last name is required');
    if (!email?.trim()) errors.push('Email is required');
    if (!validateEmail(email)) errors.push('Invalid email format');
    if (!solution?.trim()) errors.push('Solution selection is required');

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
      company: sanitizeInput(company || 'Not provided'),
      solution: sanitizeInput(solution),
      timeline: sanitizeInput(timeline || 'Not specified'),
      message: sanitizeInput(message || 'No additional message provided')
    };

    // Create email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.zoho.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
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
        message: 'Email service configuration error. Please contact us at contact@preciseanalytics.io'
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
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">New Solution Inquiry</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Precise Analytics Solutions Page</p>
        </div>
        
        <div style="padding: 30px;">
          <div style="margin-bottom: 25px;">
            <h2 style="color: #FF7D00; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #FF7D00; padding-bottom: 5px;">Contact Information</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 140px;">Name:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.firstName} ${sanitizedData.lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Email:</td>
                <td style="padding: 8px 0; color: #666;"><a href="mailto:${sanitizedData.email}" style="color: #FF7D00; text-decoration: none;">${sanitizedData.email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Company:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.company}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 25px;">
            <h2 style="color: #FF7D00; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #FF7D00; padding-bottom: 5px;">Project Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333; width: 140px;">Solution Interest:</td>
                <td style="padding: 8px 0; color: #666; font-weight: 600;">${sanitizedData.solution}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #333;">Timeline:</td>
                <td style="padding: 8px 0; color: #666;">${sanitizedData.timeline}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 25px;">
            <h2 style="color: #FF7D00; font-size: 20px; margin: 0 0 15px 0; border-bottom: 2px solid #FF7D00; padding-bottom: 5px;">Project Details & Requirements</h2>
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
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Thank You for Your Interest!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Precise Analytics</p>
        </div>
        
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">
            Dear ${sanitizedData.firstName},
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 20px 0;">
            Thank you for your interest in our <strong>${sanitizedData.solution}</strong> solution! We've received your inquiry and our team is excited to help transform your data capabilities.
          </p>
          
          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 0 0 25px 0;">
            A member of our solutions team will review your requirements and reach out within 24 hours to discuss how we can best support your goals.
          </p>

          <div style="background: #f8f9fa; padding: 20px; border-radius: 6px; border-left: 4px solid #FF7D00; margin: 25px 0;">
            <h3 style="color: #FF7D00; margin: 0 0 10px 0; font-size: 18px;">Your Inquiry Summary:</h3>
            <p style="margin: 5px 0; color: #666;"><strong>Solution:</strong> ${sanitizedData.solution}</p>
            <p style="margin: 5px 0; color: #666;"><strong>Timeline:</strong> ${sanitizedData.timeline}</p>
            <p style="margin: 5px 0; color: #666;"><strong>Company:</strong> ${sanitizedData.company}</p>
          </div>

          <div style="text-align: center; margin: 30px 0;">
            <a href="https://preciseanalytics.io/services" style="background: linear-gradient(135deg, #FF7D00, #FFA500); color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">Explore Our Services</a>
          </div>

          <p style="font-size: 16px; color: #333; line-height: 1.6; margin: 25px 0 0 0;">
            Best regards,<br>
            <strong>The Precise Analytics Team</strong>
          </p>
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #e0e0e0;">
          <p style="margin: 0; color: #666; font-size: 12px;">
            Questions? Contact us at <a href="mailto:contact@preciseanalytics.io" style="color: #FF7D00;">contact@preciseanalytics.io</a> or call <a href="tel:+18043964148" style="color: #FF7D00;">(804) 396-4148</a>
          </p>
        </div>
      </div>
    `;

    // Send email to your team
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'contact@preciseanalytics.io',
      subject: `New Solution Inquiry: ${sanitizedData.solution} - ${sanitizedData.firstName} ${sanitizedData.lastName}`,
      html: teamEmailHtml,
      replyTo: sanitizedData.email
    });

    // Send auto-reply to customer
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: sanitizedData.email,
      subject: `Thank you for your interest in ${sanitizedData.solution} - Precise Analytics`,
      html: customerEmailHtml
    });

    // Log successful submission
    console.log(`Solutions form submission from ${sanitizedData.email} for ${sanitizedData.solution} at ${currentTime}`);

    return res.status(200).json({
      success: true,
      message: 'Thank you! We\'ll be in touch within 24 hours to discuss your project.'
    });

  } catch (error) {
    console.error('Solutions form error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Sorry, there was an error sending your message. Please email us directly at contact@preciseanalytics.io'
    });
  }
}