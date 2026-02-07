# 📧 EmailJS Setup Guide - Send OTP via Email

## 🎯 Goal

Set up EmailJS to send OTP codes via email instead of showing them on screen.

---

## ✅ Step-by-Step Setup

### Step 1: Create EmailJS Account

1. Go to: **https://www.emailjs.com/**
2. Click **"Sign Up"** (top right)
3. Create account with your email
4. Verify your email address

---

### Step 2: Create Email Service

1. After login, go to **"Email Services"** (left sidebar)
2. Click **"Add New Service"** button
3. Choose your email provider:
   - **Gmail** (recommended - easiest)
   - **Outlook**
   - **Yahoo**
   - Or **Custom SMTP**
4. **For Gmail:**
   - Click **"Connect Account"**
   - Sign in with your Gmail
   - Allow EmailJS access
   - Click **"Create Service"**
5. **Copy the Service ID** (you'll see it after creation)
   - Example: `service_abc123`

---

### Step 3: Create Email Template

1. Go to **"Email Templates"** (left sidebar)
2. Click **"Create New Template"** button
3. Fill in the template:

   **Template Name:**
   ```
   Login OTP
   ```

   **Subject:**
   ```
   Your Login OTP Code - BI Dashboard Portal
   ```

   **Content (HTML):**
   ```html
   <h2>Your Login OTP Code</h2>
   <p>Hello,</p>
   <p>Your login OTP code is:</p>
   <h1 style="font-size: 32px; color: #4a90e2; letter-spacing: 8px; font-family: monospace;">{{otp}}</h1>
   <p>This code will expire in <strong>10 minutes</strong>.</p>
   <p>If you didn't request this OTP, please ignore this email.</p>
   <hr>
   <p style="color: #666; font-size: 12px;">This is an automated email from BI Dashboard Portal.</p>
   ```

   **To Email:**
   ```
   {{to_email}}
   ```

   **From Name:**
   ```
   BI Dashboard Portal
   ```

4. Click **"Save"** button
5. **Copy the Template ID** (you'll see it after saving)
   - Example: `template_xyz789`

---

### Step 4: Get Public Key

1. Go to **"Account"** → **"General"** (left sidebar)
2. Scroll down to **"API Keys"** section
3. Find **"Public Key"**
4. **Copy the Public Key**
   - Example: `abcdefghijklmnop`

---

### Step 5: Update Configuration File

1. Open: `src/config/emailjs.config.js`
2. Replace the placeholder values:

```javascript
export const emailjsConfig = {
  // Paste your Public Key here
  publicKey: 'YOUR_PUBLIC_KEY_HERE',  // ← Replace with your Public Key
  
  // Paste your Service ID here
  serviceId: 'YOUR_SERVICE_ID_HERE',  // ← Replace with your Service ID
  
  // Paste your Template ID here
  templateId: 'YOUR_TEMPLATE_ID_HERE',  // ← Replace with your Template ID
  
  // Keep this as true to enable email sending
  enabled: true
};
```

**Example:**
```javascript
export const emailjsConfig = {
  publicKey: 'abcdefghijklmnop',
  serviceId: 'service_abc123',
  templateId: 'template_xyz789',
  enabled: true
};
```

3. **Save the file**

---

### Step 6: Test It!

1. **Refresh your browser** (or restart dev server)
2. Go to login page
3. Enter your email
4. Click **"Send OTP"**
5. **Check your email inbox** (and spam folder)
6. You should receive the OTP via email! ✅

---

## 🔍 Troubleshooting

### OTP Still Shows on Screen?

**Check:**
1. ✅ Public Key is correct
2. ✅ Service ID is correct
3. ✅ Template ID is correct
4. ✅ `enabled: true` in config
5. ✅ Browser console for errors (F12)

### Email Not Received?

**Check:**
1. ✅ Spam/junk folder
2. ✅ Email address is correct
3. ✅ EmailJS service is connected
4. ✅ Check EmailJS dashboard for sent emails
5. ✅ Browser console for errors

### "EmailJS not configured" Message?

- Make sure you replaced ALL three values in `emailjs.config.js`
- Make sure you didn't leave `YOUR_PUBLIC_KEY_HERE` as-is

### "Service ID not found" Error?

- Verify Service ID in EmailJS dashboard
- Make sure service is active/enabled

### "Template ID not found" Error?

- Verify Template ID in EmailJS dashboard
- Make sure template is saved and active

---

## 📊 EmailJS Free Tier Limits

- **200 emails/month** (free tier)
- **100 emails/day** limit
- Perfect for testing and small projects

**Upgrade:** If you need more, upgrade to paid plan ($15/month for 1,000 emails)

---

## ✅ Quick Checklist

- [ ] EmailJS account created
- [ ] Email service connected (Gmail/Outlook/etc.)
- [ ] Service ID copied
- [ ] Email template created
- [ ] Template ID copied
- [ ] Public Key copied
- [ ] `emailjs.config.js` updated with all three values
- [ ] Browser refreshed
- [ ] Tested - OTP received via email ✅

---

## 🎉 Success!

Once configured, users will:
1. Enter email
2. Click "Send OTP"
3. **Receive OTP via email** (not shown on screen)
4. Enter OTP from email
5. Complete login

**No more OTP on screen!** 🎊

---

## 📝 Notes

- OTP is still stored in Firestore/localStorage for verification
- EmailJS sends the email from your connected email account
- Emails may take 5-30 seconds to arrive
- Check spam folder if email doesn't arrive immediately



