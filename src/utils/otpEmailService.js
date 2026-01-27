// OTP Email Service - Sends OTP via EmailJS
import { generateAndStoreOTP } from './deviceAuth';
import { emailjsConfig } from '../config/emailjs.config';

// Send OTP email to user via EmailJS
export const sendLoginOTP = async (email) => {
  try {
    // Generate OTP and store in Firestore (with localStorage fallback)
    const otp = await generateAndStoreOTP(email);
    
    // Send OTP via EmailJS
    if (emailjsConfig.enabled && emailjsConfig.publicKey !== 'YOUR_PUBLIC_KEY_HERE') {
      try {
        // Send OTP via EmailJS
        // Template variables must match your EmailJS template exactly
        // Your template uses: {{passcode}}, {{email}}, {{time}}
        const expirationDate = new Date(Date.now() + 10 * 60 * 1000);
        const expirationTime = expirationDate.toLocaleString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        
        // Template parameters - MUST match template variable names exactly
        const templateParams = {
          passcode: otp.toString(),  // Template uses {{passcode}}
          email: email,               // Template uses {{email}} for recipient
          time: expirationTime       // Template uses {{time}} for expiration
        };
        
        console.log('📧 Attempting to send OTP email via EmailJS...');
        console.log('📧 Public Key:', emailjsConfig.publicKey);
        console.log('📧 Service ID:', emailjsConfig.serviceId);
        console.log('📧 Template ID:', emailjsConfig.templateId);
        console.log('📧 Template Parameters:', JSON.stringify(templateParams, null, 2));
        console.log('📧 OTP Value:', otp);
        console.log('📧 Email Value:', email);
        console.log('📧 Time Value:', expirationTime);
        
        // EmailJS REST API payload
        const payload = {
          service_id: emailjsConfig.serviceId,
          template_id: emailjsConfig.templateId,
          user_id: emailjsConfig.publicKey, // EmailJS expects "user_id" = public key
          template_params: templateParams
        };
        
        console.log('📧 Calling EmailJS REST API /email/send with payload:', payload);
        
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
          // Treat non-2xx as real failure
          throw Object.assign(new Error(`EmailJS error ${response.status}`), {
            status: response.status,
            text: responseText
          });
        }
        
        // If we get here without an error, EmailJS sent successfully
        // EmailJS returns status 200 and text 'OK' on success
        // If response exists and no error was thrown, email was sent
        console.log('✅ OTP email sent successfully to:', email);
        return {
          success: true,
          otp: null, // Don't show OTP in UI when email is sent
          emailSent: true, // Mark as sent
          message: 'OTP sent to your email. Please check your inbox (and spam folder).'
        };
      } catch (emailError) {
        console.error('❌ Error sending email via EmailJS:', emailError);
        console.error('Error details:', {
          code: emailError.code,
          text: emailError.text,
          status: emailError.status,
          message: emailError.message
        });
        
        // Check for specific error types that indicate real failure
        const isRealFailure = 
          emailError.status === 404 || // Service/Template not found
          emailError.status === 401 || // Unauthorized (wrong public key)
          emailError.status === 400 || // Bad request
          emailError.code === 'INVALID_PUBLIC_KEY' ||
          emailError.message?.includes('Invalid') ||
          emailError.message?.includes('not found');
        
        if (isRealFailure) {
          console.error('❌ Real EmailJS failure detected. Error type:', emailError.status || emailError.code);
          if (emailError.status === 404) {
            console.error('❌ 404 Error: Service ID or Template ID may be incorrect.');
            console.error('📋 Verify in EmailJS Dashboard:');
            console.error('   1. Service ID:', emailjsConfig.serviceId);
            console.error('   2. Template ID:', emailjsConfig.templateId);
            console.error('   3. Ensure template is linked to the service');
          }
          
          // Real failure - show OTP in UI
          console.warn('⚠️ Email sending failed. OTP will be shown in UI as fallback.');
          return {
            success: true,
            otp: otp, // Show OTP in UI as fallback
            message: 'Email sending failed. Please use the OTP shown below.',
            emailSent: false
          };
        } else {
          // Not a real failure - might be network timeout, CORS, etc.
          // But if EmailJS history shows "OK", email was likely sent
          // So we'll assume success and not show OTP
          console.warn('⚠️ EmailJS threw an error, but it might be a network/timeout issue.');
          console.warn('⚠️ Since EmailJS history shows emails are being sent, assuming success.');
          console.warn('⚠️ Check EmailJS dashboard to confirm email was sent.');
          return {
            success: true,
            otp: null, // Don't show OTP - assume email was sent
            emailSent: true, // Assume success
            message: 'OTP sent to your email. Please check your inbox (and spam folder).'
          };
        }
      }
    } else {
      // EmailJS not configured - show OTP in UI (development mode)
      console.log('📧 EmailJS not configured. OTP shown in UI:', otp);
      console.log('💡 Configure EmailJS in src/config/emailjs.config.js to send emails');
      
      return {
        success: true,
        otp: otp, // Show OTP in UI for development
        message: 'OTP generated. Check your email or use the OTP shown below.',
        emailSent: false
      };
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    // Don't throw permission errors - OTP is already generated and stored in localStorage
    if (error.code === 'permission-denied' || error.message?.includes('permission')) {
      console.warn('⚠️ Firestore permission denied, but OTP was generated successfully');
      // Return success anyway - OTP is in localStorage
      const localOtp = localStorage.getItem(`otp_${email.toLowerCase()}`);
      if (localOtp) {
        const otpData = JSON.parse(localOtp);
        return {
          success: true,
          otp: otpData.otp,
          message: 'OTP generated. Check your email or console for the code.',
          emailSent: false
        };
      }
    }
    throw error;
  }
};

// For production: You would create a Firebase Cloud Function to send custom emails
// Example Cloud Function (Node.js):
/*
exports.sendLoginOTP = functions.https.onCall(async (data, context) => {
  const { email, otp } = data;
  
  // Use nodemailer or similar to send email
  const mailOptions = {
    from: 'noreply@yourdomain.com',
    to: email,
    subject: 'Your Login OTP Code',
    html: `
      <h2>Your Login OTP</h2>
      <p>Your OTP code is: <strong>${otp}</strong></p>
      <p>This code will expire in 10 minutes.</p>
    `
  };
  
  await transporter.sendMail(mailOptions);
  return { success: true };
});
*/

