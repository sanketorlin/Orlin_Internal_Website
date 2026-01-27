# 🔧 Fix EmailJS 404 Error

## ❌ Current Issue

The console shows a **404 error** from EmailJS API:
```
Failed to load resource: api.emailjs.com/api/v1.0/email/send:1 responded with status 404
```

## 🔍 Root Cause

The 404 error means EmailJS API endpoint is not found. This usually happens when:
1. **Public Key is incorrect** - The console shows `9L_svQROxIVCH6121` but config has `9L_svQROxIVCH6l2l`
2. **Service ID is wrong** - `service_mryzznl` might not exist
3. **Template ID is wrong** - `template_k3brg2s` might not exist or not linked to service
4. **API call format is incorrect** - The way we're calling EmailJS might be wrong

## ✅ Solution Steps

### Step 1: Verify EmailJS Credentials

1. **Go to EmailJS Dashboard:** https://www.emailjs.com/
2. **Check Public Key:**
   - Go to **Account → General → Public Key**
   - Copy the **exact** public key
   - Compare with `src/config/emailjs.config.js` - they must match exactly

3. **Check Service ID:**
   - Go to **Email Services**
   - Find your service (should be named something like "Orlin_Developer")
   - Copy the **Service ID** (should start with `service_`)
   - Compare with config - must match exactly

4. **Check Template ID:**
   - Go to **Email Templates**
   - Find your "One-Time Password" template
   - Copy the **Template ID** (should start with `template_`)
   - Compare with config - must match exactly
   - **IMPORTANT:** Make sure the template is **linked to the service**

### Step 2: Update Config File

If any credentials don't match, update `src/config/emailjs.config.js`:

```javascript
export const emailjsConfig = {
  publicKey: 'YOUR_EXACT_PUBLIC_KEY_HERE',  // Must match EmailJS dashboard exactly
  serviceId: 'YOUR_EXACT_SERVICE_ID_HERE',  // Must match EmailJS dashboard exactly
  templateId: 'YOUR_EXACT_TEMPLATE_ID_HERE', // Must match EmailJS dashboard exactly
  enabled: true
};
```

### Step 3: Verify Template Variables

In EmailJS Dashboard → Email Templates → Your Template:
- Make sure it has `{{passcode}}` (not `{{otp}}` or anything else)
- Make sure it has `{{email}}`
- Make sure it has `{{time}}`

### Step 4: Test Again

1. **Refresh browser** (Ctrl+F5)
2. **Clear browser cache** (or use incognito)
3. **Try sending OTP again**
4. **Check console** (F12) - should see success, not 404

## 🆘 Still Getting 404?

If you still get 404 after verifying credentials:

1. **Check EmailJS Account Status:**
   - Make sure your EmailJS account is active
   - Check if you've exceeded free tier limits

2. **Check Browser Console:**
   - Look for CORS errors
   - Look for network errors
   - Share the exact error message

3. **Try Testing from EmailJS Dashboard:**
   - Go to Email Templates
   - Click "Test" on your template
   - Fill in test values
   - If this works, the issue is in our code
   - If this fails, the issue is with EmailJS configuration

## 📋 Current Configuration

Based on console logs:
- **Public Key (in console):** `9L_svQROxIVCH6121` ⚠️ (Different from config!)
- **Public Key (in config):** `9L_svQROxIVCH6l2l`
- **Service ID:** `service_mryzznl`
- **Template ID:** `template_k3brg2s`

**Action Required:** Verify which public key is correct and update the config file.

