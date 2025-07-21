// pages/api/submit-application.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Disable body parser to handle multipart/form-data
export const config = {
  api: {
    bodyParser: false,
  },
};

interface ApplicationData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  position: string;
  message: string;
  resumeFile?: string;
  coverLetterFile?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the incoming form data
    const form = formidable({
      uploadDir: '/tmp',
      keepExtensions: true,
      maxFileSize: 5 * 1024 * 1024, // 5MB
    });

    const [fields, files] = await form.parse(req);

    // Extract form data
    const applicationData: ApplicationData = {
      firstName: Array.isArray(fields.firstName) ? fields.firstName[0] : fields.firstName || '',
      lastName: Array.isArray(fields.lastName) ? fields.lastName[0] : fields.lastName || '',
      email: Array.isArray(fields.email) ? fields.email[0] : fields.email || '',
      phone: Array.isArray(fields.phone) ? fields.phone[0] : fields.phone || '',
      position: Array.isArray(fields.position) ? fields.position[0] : fields.position || '',
      message: Array.isArray(fields.message) ? fields.message[0] : fields.message || '',
    };

    // Validate required fields
    if (!applicationData.firstName || !applicationData.lastName || !applicationData.email || !applicationData.position) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Process file attachments
    const attachments: any[] = [];
    let resumeFileName = '';
    let coverLetterFileName = '';

    if (files.resume) {
      const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      resumeFileName = resumeFile.originalFilename || 'resume';
      const resumeContent = fs.readFileSync(resumeFile.filepath);
      
      attachments.push({
        filename: resumeFileName,
        content: resumeContent,
      });
    }

    if (files.coverLetter) {
      const coverLetterFile = Array.isArray(files.coverLetter) ? files.coverLetter[0] : files.coverLetter;
      coverLetterFileName = coverLetterFile.originalFilename || 'cover-letter';
      const coverLetterContent = fs.readFileSync(coverLetterFile.filepath);
      
      attachments.push({
        filename: coverLetterFileName,
        content: coverLetterContent,
      });
    }

    // Send notification email to company
    const companyEmailResult = await resend.emails.send({
      from: 'careers@preciseanalytics.io', // This should be a verified domain in Resend
      to: ['careers@preciseanalytics.io'],
      subject: `New Application: ${applicationData.position} - ${applicationData.firstName} ${applicationData.lastName}`,
      html: generateCompanyNotificationEmail(applicationData),
      attachments: attachments,
    });

    // Send confirmation email to applicant
    const applicantEmailResult = await resend.emails.send({
      from: 'careers@preciseanalytics.io',
      to: [applicationData.email],
      subject: 'Application Received - Precise Analytics',
      html: generateApplicantConfirmationEmail(applicationData),
    });

    // Clean up temporary files
    if (files.resume) {
      const resumeFile = Array.isArray(files.resume) ? files.resume[0] : files.resume;
      fs.unlinkSync(resumeFile.filepath);
    }
    if (files.coverLetter) {
      const coverLetterFile = Array.isArray(files.coverLetter) ? files.coverLetter[0] : files.coverLetter;
      fs.unlinkSync(coverLetterFile.filepath);
    }

    // Optional: Store application data in database
    await storeApplicationData(applicationData, resumeFileName, coverLetterFileName);

    res.status(200).json({ 
      success: true, 
      message: 'Application submitted successfully',
      companyEmailId: companyEmailResult.data?.id,
      applicantEmailId: applicantEmailResult.data?.id,
    });

  } catch (error) {
  console.error('Application submission error:', error);
  
  // Better error logging for debugging
  if (error instanceof Error) {
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
  }
  
  res.status(500).json({ 
    error: 'Failed to submit application. Please try again or contact us directly.',
    // Remove this debug info in production:
    debug: error instanceof Error ? error.message : 'Unknown error'
  });
}

function generateCompanyNotificationEmail(data: ApplicationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New Job Application</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff7d00, #ffa500); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #666; }
        .value { margin-top: 5px; }
        .message-box { background: white; padding: 20px; border-left: 4px solid #ff7d00; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Job Application Received</h1>
        </div>
        <div class="content">
          <h2>Application for: ${data.position}</h2>
          
          <div class="field">
            <div class="label">Applicant Name:</div>
            <div class="value">${data.firstName} ${data.lastName}</div>
          </div>
          
          <div class="field">
            <div class="label">Email:</div>
            <div class="value"><a href="mailto:${data.email}">${data.email}</a></div>
          </div>
          
          ${data.phone ? `
          <div class="field">
            <div class="label">Phone:</div>
            <div class="value">${data.phone}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="label">Position Applied For:</div>
            <div class="value">${data.position}</div>
          </div>
          
          <div class="message-box">
            <div class="label">Why are they interested in this role?</div>
            <div class="value">${data.message.replace(/\n/g, '<br>')}</div>
          </div>
          
          <div class="field">
            <div class="label">Attachments:</div>
            <div class="value">
              • Resume/CV (attached)<br>
              ${data.message.includes('coverLetter') ? '• Cover Letter (attached)<br>' : ''}
              Please find the application documents attached to this email.
            </div>
          </div>
          
          <div class="footer">
            <p>This application was submitted through the Precise Analytics careers page.</p>
            <p>Submitted on: ${new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function generateApplicantConfirmationEmail(data: ApplicationData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Application Confirmation</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff7d00, #ffa500); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
        .highlight { background: white; padding: 20px; border-left: 4px solid #ff7d00; margin: 20px 0; }
        .next-steps { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
        .contact-info { background: #e9f4ff; padding: 15px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Thank You for Your Application!</h1>
          <p>We've received your application for the ${data.position} position</p>
        </div>
        <div class="content">
          <p>Dear ${data.firstName},</p>
          
          <p>Thank you for your interest in joining the Precise Analytics team! We have successfully received your application for the <strong>${data.position}</strong> position.</p>
          
          <div class="highlight">
            <h3>Application Summary:</h3>
            <p><strong>Position:</strong> ${data.position}<br>
            <strong>Submitted:</strong> ${new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            })}<br>
            <strong>Contact Email:</strong> ${data.email}</p>
          </div>
          
          <div class="next-steps">
            <h3>What Happens Next?</h3>
            <p>Our team will carefully review your application and qualifications. Here's what you can expect:</p>
            <ul>
              <li><strong>Initial Review:</strong> We'll review your application within 1-2 business days</li>
              <li><strong>Follow-up:</strong> If your background aligns with our needs, we'll reach out within 5-7 business days</li>
              <li><strong>Interview Process:</strong> Qualified candidates will be invited for interviews</li>
            </ul>
          </div>
          
          <div class="contact-info">
            <h3>Questions?</h3>
            <p>If you have any questions about your application or the position, please don't hesitate to contact us:</p>
            <p><strong>Email:</strong> <a href="mailto:apply@preciseanalytics.io">apply@preciseanalytics.io</a><br>
            <strong>Phone:</strong> Available upon request</p>
          </div>
          
          <p>We appreciate your interest in Precise Analytics and look forward to the possibility of having you join our mission-driven team.</p>
          
          <p>Best regards,<br>
          <strong>The Precise Analytics Talent Team</strong><br>
          Empowering missions through data</p>
          
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this message.</p>
            <p>© ${new Date().getFullYear()} Precise Analytics. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

async function storeApplicationData(data: ApplicationData, resumeFileName: string, coverLetterFileName: string) {
  // This is where you would store the application data in your database
  // For now, we'll just log it. You can integrate with your preferred database:
  
  const applicationRecord = {
    ...data,
    resumeFileName,
    coverLetterFileName,
    submittedAt: new Date().toISOString(),
  };
  
  console.log('Storing application:', applicationRecord);
  
  // Example database integration (uncomment and modify as needed):
  /*
  try {
    // Using Prisma example:
    const application = await prisma.application.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        position: data.position,
        message: data.message,
        resumeFileName,
        coverLetterFileName,
        submittedAt: new Date(),
      },
    });
    
    return application;
  } catch (error) {
    console.error('Database storage error:', error);
    // Don't throw error - we don't want to fail the application submission if DB fails
  }
  */
}} // <- MAKE SURE THIS CLOSING BRACE IS HERE