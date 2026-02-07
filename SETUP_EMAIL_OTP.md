# 📧 Setup Email OTP Sending

## Current Situation

**Why you see OTP on screen:**
- The app is in **development mode**
- Email sending is not configured yet
- OTP is displayed in UI for testing purposes

**Why you don't receive emails:**
- No email service is configured
- Firebase doesn't send custom OTP emails directly
- Need to set up email service (EmailJS, SendGrid, or Firebase Cloud Functions)

---

## ✅ Solution: Setup EmailJS (Free & Easy)

EmailJS is a free email service that works directly from the browser. No backend needed!

### Step 1: Create EmailJS Account

1. Go to: https://www.emailjs.com/
2. Click **"Sign Up"** (free account)
3. Create account with your email

### Step 2: Create Email Service

1. After login, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose **"Gmail"** (or your email provider)
4. Connect your Gmail account
5. Click **"Create Service"**
6. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Template

1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Set up template:
   - **Template Name:** "Login OTP"
   - **Subject:** `Your Login OTP Code`
   - **Content:**
   ```
   <h2>Your Login OTP</h2>
   <p>Your OTP code is: <strong>{{otp}}</strong></p>
   <p>This code will expire in 10 minutes.</p>
   <p>If you didn't request this, please ignore this email.</p>
   ```
4. **To Email:** `{{to_email}}`
5. Click **"Save"**
6. **Copy the Template ID**

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"**
2. Find **"Public Key"**
3. **Copy the Public Key**

### Step 5: Update Your Code

I'll update the code to use EmailJS. You'll need to provide:
- Service ID
- Template ID  
- Public Key

---

## 🔄 Alternative: Use Firebase Password Reset Email (Quick Workaround)

If you want a quick workaround, we can use Firebase's password reset email feature, but it won't send the OTP - it will send a password reset link instead.

---

## 📝 Which Option Do You Prefer?

1. **EmailJS** (Recommended) - Free, easy, sends actual OTP emails
2. **Firebase Cloud Functions** - More complex, requires backend setup
3. **Keep showing OTP on screen** - For development/testing only

Let me know which option you prefer, and I'll implement it!



