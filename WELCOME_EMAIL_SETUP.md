# 📧 Welcome Email Setup Guide

## ✅ Feature Added: Automatic Welcome Email & OTP

When you add a new user through the website, the system now **automatically**:

1. ✅ Creates user in Firebase Authentication
2. ✅ Adds user to Firestore with role
3. ✅ **Sends welcome email** with login credentials
4. ✅ **Sends OTP email** for account verification

---

## 🔧 EmailJS Template Setup

### Option 1: Use Existing OTP Template (Quick Setup)

If you already have an OTP email template set up, the system will use it to send the OTP. The welcome email will use the same template.

**Current Template Variables Used:**
- `{{passcode}}` - OTP code (6 digits)
- `{{email}}` - User's email address
- `{{time}}` - Expiration time

---

### Option 2: Create Separate Welcome Email Template (Recommended)

For better user experience, create a dedicated welcome email template:

#### Step 1: Create Welcome Email Template in EmailJS

1. **Go to:** https://www.emailjs.com/
2. **Login** to your account
3. **Navigate to:** Email Templates → Create New Template
4. **Template Name:** "Welcome Email" or "New User Welcome"

#### Step 2: Design Your Template

Use these variables in your template:

```
Subject: Welcome to BI Dashboard Portal - Your Account is Ready!

Body:
Hello {{user_name}},

Your account has been created successfully!

Account Details:
- Email: {{user_email}}
- Password: {{user_password}}
- Role: {{user_role}}

Login Instructions:
1. Go to: {{login_url}}
2. Enter your email: {{user_email}}
3. Click "Send OTP" (for new device)
4. Enter the OTP code sent to your email
5. Enter your password: {{user_password}}
6. Click "Login"

Important:
- Please change your password after first login
- Save your password securely
- If you forget your password, use "Forgot Password?" on login page

Your OTP Code: {{passcode}}
(Valid for 10 minutes)

Best regards,
BI Dashboard Portal Team
```

#### Step 3: Template Variables

Make sure your template includes these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{to_email}}` | Recipient email | `user@example.com` |
| `{{user_name}}` | User's full name | `John Doe` |
| `{{user_email}}` | User's email | `user@example.com` |
| `{{user_password}}` | Temporary password | `SecurePass123` |
| `{{user_role}}` | User's role | `Team Head` |
| `{{login_url}}` | Login page URL | `http://localhost:5173` |
| `{{passcode}}` | OTP code (optional) | `123456` |

#### Step 4: Update Code (Optional)

If you want to use a different template for welcome emails, update `src/utils/welcomeEmailService.js`:

```javascript
// Change template_id to your welcome email template
template_id: 'template_welcome_email_id', // Your welcome template ID
```

---

## 📋 Current Implementation

### What Gets Sent:

1. **Welcome Email** (via `sendWelcomeEmail`)
   - User's name
   - Email address
   - Password
   - Role
   - Login URL

2. **OTP Email** (via `sendLoginOTP`)
   - 6-digit OTP code
   - Expiration time
   - Instructions

### Email Sending Flow:

```
User Created
    ↓
Welcome Email Sent (with credentials)
    ↓
OTP Email Sent (for verification)
    ↓
User Receives Both Emails
```

---

## ✅ Testing

### Test Welcome Email:

1. **Add a new user** through User Management
2. **Check the success message** - should show:
   - ✅ Welcome email sent
   - ✅ OTP email sent
3. **Check user's email inbox** (and spam folder)
4. **Verify** both emails were received

### If Emails Not Sending:

1. **Check EmailJS Configuration:**
   - File: `src/config/emailjs.config.js`
   - Verify: `publicKey`, `serviceId`, `templateId` are correct
   - Verify: `enabled: true`

2. **Check EmailJS Dashboard:**
   - Go to: https://www.emailjs.com/
   - Check: Email History
   - Look for: Failed emails and error messages

3. **Check Browser Console:**
   - Press F12
   - Go to Console tab
   - Look for: Email sending logs
   - Check for: Error messages

---

## 🔍 Troubleshooting

### Issue: "EmailJS not configured"

**Cause:** EmailJS config has placeholder values

**Fix:**
1. Get your EmailJS credentials from https://www.emailjs.com/
2. Update `src/config/emailjs.config.js`:
   ```javascript
   publicKey: 'YOUR_ACTUAL_PUBLIC_KEY',
   serviceId: 'YOUR_ACTUAL_SERVICE_ID',
   templateId: 'YOUR_ACTUAL_TEMPLATE_ID',
   enabled: true
   ```

### Issue: "Welcome email not sent"

**Possible Causes:**
- EmailJS not configured
- Template ID incorrect
- Service ID incorrect
- Network error

**Fix:**
1. Check EmailJS configuration
2. Verify template exists in EmailJS dashboard
3. Check browser console for errors
4. Check EmailJS email history

### Issue: "OTP email not sent"

**Possible Causes:**
- Same as welcome email issues
- OTP template not configured
- Firestore permissions issue

**Fix:**
1. Check OTP email service configuration
2. Verify Firestore rules allow OTP storage
3. Check browser console for errors

---

## 📝 Email Template Example

Here's a complete HTML template example:

```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #4a90e2; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f5f5f5; }
        .credentials { background: white; padding: 15px; border-left: 4px solid #4a90e2; margin: 15px 0; }
        .button { background: #4a90e2; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to BI Dashboard Portal!</h1>
        </div>
        <div class="content">
            <p>Hello <strong>{{user_name}}</strong>,</p>
            
            <p>Your account has been created successfully!</p>
            
            <div class="credentials">
                <h3>Your Login Credentials:</h3>
                <p><strong>Email:</strong> {{user_email}}</p>
                <p><strong>Password:</strong> {{user_password}}</p>
                <p><strong>Role:</strong> {{user_role}}</p>
            </div>
            
            <p><strong>Your OTP Code:</strong> {{passcode}}</p>
            <p><small>(Valid for 10 minutes)</small></p>
            
            <p>To login:</p>
            <ol>
                <li>Go to: <a href="{{login_url}}">{{login_url}}</a></li>
                <li>Enter your email</li>
                <li>Click "Send OTP"</li>
                <li>Enter the OTP code: <strong>{{passcode}}</strong></li>
                <li>Enter your password</li>
                <li>Click "Login"</li>
            </ol>
            
            <a href="{{login_url}}" class="button">Login Now</a>
            
            <p><strong>Important:</strong></p>
            <ul>
                <li>Please change your password after first login</li>
                <li>Save your password securely</li>
                <li>If you forget your password, use "Forgot Password?" on login page</li>
            </ul>
            
            <p>Best regards,<br>BI Dashboard Portal Team</p>
        </div>
    </div>
</body>
</html>
```

---

## ✅ Summary

**What's New:**
- ✅ Welcome email sent automatically when user is created
- ✅ OTP email sent automatically when user is created
- ✅ Both emails include all necessary information
- ✅ User can login immediately after receiving emails

**What You Need to Do:**
1. ✅ Configure EmailJS (if not already done)
2. ✅ Create welcome email template (optional, can use OTP template)
3. ✅ Test by adding a new user
4. ✅ Verify emails are received

**That's it!** Users will now receive welcome emails and OTP automatically when created! 🎉

