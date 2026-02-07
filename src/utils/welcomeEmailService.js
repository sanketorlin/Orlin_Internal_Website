// Welcome Email Service - Sends welcome email with credentials when user is created
import { emailjsConfig } from '../config/emailjs.config';

// Send welcome email to new user with their login credentials
export const sendWelcomeEmail = async (email, name, password, role) => {
  try {
    // Check if EmailJS is configured
    if (!emailjsConfig.enabled || emailjsConfig.publicKey === 'YOUR_PUBLIC_KEY_HERE') {
      console.log('📧 EmailJS not configured. Welcome email not sent.');
      console.log('💡 Configure EmailJS in src/config/emailjs.config.js to send welcome emails');
      return {
        success: false,
        emailSent: false,
        message: 'EmailJS not configured. Welcome email not sent.'
      };
    }

    // Prepare email content
    const loginUrl = window.location.origin;
    const roleDisplay = role.charAt(0).toUpperCase() + role.slice(1).replace('-', ' ');
    
    // Template parameters - adjust these to match your EmailJS template
    const templateParams = {
      to_email: email,           // Recipient email
      user_name: name || email.split('@')[0],  // User's name
      user_email: email,          // User's email
      user_password: password,     // Temporary password
      user_role: roleDisplay,     // User's role
      login_url: loginUrl,        // Login URL
      // Add more fields as needed for your template
    };

    console.log('📧 Attempting to send welcome email via EmailJS...');
    console.log('📧 Recipient:', email);
    console.log('📧 Template Parameters:', JSON.stringify(templateParams, null, 2));

    // EmailJS REST API payload
    const payload = {
      service_id: emailjsConfig.serviceId,
      template_id: emailjsConfig.templateId, // You may want a different template for welcome emails
      user_id: emailjsConfig.publicKey,
      template_params: templateParams
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('✅ EmailJS HTTP Status:', response.status);
    const responseText = await response.text();
    console.log('✅ EmailJS Response Text:', responseText);

    if (!response.ok) {
      throw new Error(`EmailJS error ${response.status}: ${responseText}`);
    }

    console.log('✅ Welcome email sent successfully to:', email);
    console.log('📧 Check EmailJS dashboard to verify email delivery');
    return {
      success: true,
      emailSent: true,
      message: 'Welcome email sent successfully!'
    };
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    console.error('Error details:', {
      message: error.message,
      status: error.status
    });

    // Don't fail user creation if email fails - just log it
    return {
      success: false,
      emailSent: false,
      message: `Welcome email failed: ${error.message}`,
      error: error
    };
  }
};

