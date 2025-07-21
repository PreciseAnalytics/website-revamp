// test-contact-api.js
// This tests the EXACT same code as your production contact API
const nodemailer = require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testContactAPI() {
  console.log('🧪 Testing Contact API Configuration Locally...\n');
  
  // Check environment variables
  console.log('📋 Environment Variables Check:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST || 'NOT SET');
  console.log('SMTP_PORT:', process.env.SMTP_PORT || 'NOT SET');
  console.log('SMTP_USER:', process.env.SMTP_USER ? 'SET' : 'NOT SET');
  console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'SET' : 'NOT SET');
  console.log('CONTACT_EMAIL:', process.env.CONTACT_EMAIL || 'NOT SET');
  
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log('\n❌ Missing required environment variables!');
    process.exit(1);
  }
  
  // Test data (same format as your contact form)
  const testData = {
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    phone: '(555) 123-4567',
    company: 'Test Company',
    jobTitle: 'Developer',
    projectType: 'Data Analytics',
    budget: '$10,000 - $25,000',
    timeline: '3-6 months',
    message: 'This is a test message from the local API test script.'
  };
  
  try {
    console.log('\n🔧 Creating email transporter (EXACT same as production)...');
    
    // EXACT same configuration as your production contact API
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
    
    console.log('✅ Transporter created successfully');
    
    // Verify transporter configuration (EXACT same as production)
    console.log('\n🔍 Verifying transporter...');
    try {
      await transporter.verify();
      console.log('✅ Transporter verification successful!');
    } catch (error) {
      console.log('❌ Transporter verification failed:', error.message);
      throw error;
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
    
    // Simple email content for testing
    const teamEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: linear-gradient(135deg, #FF7D00, #FFA500); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🧪 LOCAL TEST - Contact Form Submission</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Precise Analytics Website (Local Test)</p>
        </div>
        
        <div style="padding: 30px;">
          <h2 style="color: #FF7D00;">Contact Information</h2>
          <p><strong>Name:</strong> ${testData.firstName} ${testData.lastName}</p>
          <p><strong>Email:</strong> ${testData.email}</p>
          <p><strong>Phone:</strong> ${testData.phone}</p>
          <p><strong>Company:</strong> ${testData.company}</p>
          <p><strong>Job Title:</strong> ${testData.jobTitle}</p>
          
          <h2 style="color: #FF7D00;">Project Details</h2>
          <p><strong>Project Type:</strong> ${testData.projectType}</p>
          <p><strong>Budget:</strong> ${testData.budget}</p>
          <p><strong>Timeline:</strong> ${testData.timeline}</p>
          
          <h2 style="color: #FF7D00;">Message</h2>
          <p>${testData.message}</p>
          
          <p><strong>Test Time:</strong> ${currentTime} (EST)</p>
          <p><em>This is a LOCAL TEST of your contact API configuration.</em></p>
        </div>
      </div>
    `;
    
    console.log('\n📧 Sending test email to your team...');
    
    // Send email to your team (EXACT same as production)
    const teamResult = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      subject: `LOCAL TEST - Contact API: ${testData.firstName} ${testData.lastName}`,
      html: teamEmailHtml,
      replyTo: testData.email
    });
    
    console.log('✅ Team email sent successfully!');
    console.log('📧 Message ID:', teamResult.messageId);
    
    console.log('\n📧 Sending auto-reply to test customer...');
    
    // Auto-reply to customer
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; border: 1px solid #e0e0e0;">
        <div style="background: linear-gradient(135deg, #FF7D00, #FFA500); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">🧪 LOCAL TEST - Thank You!</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0; font-size: 16px;">Precise Analytics (Local Test)</p>
        </div>
        
        <div style="padding: 30px;">
          <p>Dear ${testData.firstName},</p>
          
          <p>This is a <strong>LOCAL TEST</strong> of the Precise Analytics contact form auto-reply system.</p>
          
          <p>If you receive this email, it means the contact API configuration is working correctly!</p>
          
          <p>Test performed at: ${currentTime} (EST)</p>
          
          <p>Best regards,<br><strong>The Precise Analytics Team (Test System)</strong></p>
        </div>
      </div>
    `;
    
    // Send auto-reply (EXACT same as production)
    const customerResult = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: testData.email, // This will fail since test@example.com isn't real, but that's OK
      subject: 'LOCAL TEST - Thank you for contacting Precise Analytics',
      html: customerEmailHtml
    });
    
    console.log('✅ Auto-reply sent successfully!');
    console.log('📧 Message ID:', customerResult.messageId);
    
    console.log('\n🎉 SUCCESS! Local Contact API test completed successfully!');
    console.log('\n✅ Your configuration is working perfectly:');
    console.log(`   Host: ${process.env.SMTP_HOST}`);
    console.log(`   Port: ${process.env.SMTP_PORT}`);
    console.log(`   User: ${process.env.SMTP_USER}`);
    console.log(`   Contact: ${process.env.CONTACT_EMAIL}`);
    
    console.log('\n🚀 This exact configuration should work in production.');
    console.log('📬 Check your email to confirm both emails arrived!');
    
  } catch (error) {
    console.log('\n❌ Local Contact API test failed:');
    console.log('Error:', error.message);
    
    if (error.code) {
      console.log('Error Code:', error.code);
    }
    
    if (error.response) {
      console.log('Server Response:', error.response);
    }
    
    console.log('\n🔍 This error needs to be fixed before deploying to production.');
  }
}

// Run the test
testContactAPI().catch(console.error);