# 🔧 EmailJS Troubleshooting Guide

## ❌ Issue: Email Not Sending / OTP Still Shows on Screen

If you're seeing "Email sending failed" and OTP is displayed on screen, follow these steps:

---

## ✅ Step 1: Check Browser Console

1. Open browser console (F12)
2. Look for EmailJS errors
3. Common errors:
   - `Service ID not found`
   - `Template ID not found`
   - `Invalid template parameters`
   - `Rate limit exceeded`

---

## ✅ Step 2: Verify EmailJS Template Variables

Your EmailJS template must use these variable names:

**Required Variables:**
- `{{to_email}}` - Recipient email address
- `{{otp}}` - The OTP code

**Optional Variables:**
- `{{from_name}}` - Sender name
- `{{message}}` - Additional message

### Check Your Template:

1. Go to EmailJS → Email Templates
2. Open your template: "One-Time Password"
3. Verify it has:
   - **To Email:** `{{to_email}}`
   - **Subject:** Should contain `{{otp}}` or be static
   - **Content:** Should contain `{{otp}}`

---

## ✅ Step 3: Test EmailJS Template

1. Go to EmailJS → Email Templates
2. Click on your template
3. Click **"Test"** button
4. Enter test email address
5. Click **"Send Test Email"**
6. Check if test email arrives

**If test email fails:**
- Check Gmail connection
- Verify service is active
- Check email quota

---

## ✅ Step 4: Verify Service Connection

1. Go to EmailJS → Email Services
2. Check your service: `service_mryzznl`
3. Verify:
   - ✅ Service is **Active**
   - ✅ Gmail is **Connected**
   - ✅ Connected as: `sanket.orlin@gmail.com`

**If disconnected:**
- Click "Reconnect"
- Re-authorize Gmail access

---

## ✅ Step 5: Check EmailJS Quota

1. Go to EmailJS → Account → Usage
2. Check:
   - **Free tier:** 200 emails/month
   - **Daily limit:** 100 emails/day
   - **Current usage:** Make sure you haven't exceeded

**If quota exceeded:**
- Wait 24 hours for daily reset
- Or upgrade to paid plan

---

## ✅ Step 6: Verify Config File

Check `src/config/emailjs.config.js`:

```javascript
export const emailjsConfig = {
  publicKey: '9L_svQROxIVCH6l2l',        // ✅ Correct
  serviceId: 'service_mryzznl',          // ✅ Correct
  templateId: 'template_il5fdro',        // ✅ Correct
  enabled: true                           // ✅ Enabled
};
```

---

## ✅ Step 7: Check EmailJS Dashboard

1. Go to EmailJS → Dashboard
2. Check **"Sent Emails"** section
3. Look for:
   - Failed attempts
   - Error messages
   - Rate limit warnings

---

## 🔍 Common Errors & Fixes

### Error: "Service ID not found"
**Fix:**
- Verify Service ID: `service_mryzznl`
- Check service is active
- Make sure service is connected

### Error: "Template ID not found"
**Fix:**
- Verify Template ID: `template_il5fdro`
- Check template is saved
- Make sure template is active

### Error: "Invalid template parameters"
**Fix:**
- Check template uses: `{{to_email}}` and `{{otp}}`
- Verify variable names match exactly
- No typos in variable names

### Error: "Rate limit exceeded"
**Fix:**
- Wait 24 hours
- Check daily quota (100 emails/day)
- Upgrade plan if needed

### Error: "Gmail connection failed"
**Fix:**
- Reconnect Gmail in EmailJS
- Re-authorize permissions
- Check Gmail account is active

---

## 🧪 Test Steps

1. **Clear browser cache** (Ctrl+Shift+Delete)
2. **Refresh browser** (Ctrl+F5)
3. **Open browser console** (F12)
4. **Try sending OTP**
5. **Check console for errors**
6. **Check EmailJS dashboard** for sent emails
7. **Check email inbox** (and spam folder)

---

## 📧 Verify Email Template Setup

Your template should look like this:

**Subject:**
```
Your Login OTP Code - BI Dashboard Portal
```

**Content:**
```html
<h2>Your Login OTP Code</h2>
<p>Your OTP code is: <strong>{{otp}}</strong></p>
<p>This code expires in 10 minutes.</p>
<p>If you didn't request this, please ignore this email.</p>
```

**To Email:**
```
{{to_email}}
```

---

## ✅ Quick Checklist

- [ ] Browser console checked (F12)
- [ ] EmailJS template variables verified (`{{to_email}}`, `{{otp}}`)
- [ ] Test email sent successfully from EmailJS dashboard
- [ ] Gmail service connected and active
- [ ] Email quota not exceeded
- [ ] Config file has correct values
- [ ] Browser cache cleared
- [ ] Browser refreshed
- [ ] Checked spam folder

---

## 🆘 Still Not Working?

1. **Check EmailJS Dashboard:**
   - Go to EmailJS → Dashboard
   - Look for error logs
   - Check sent emails section

2. **Try Manual Test:**
   - Go to EmailJS → Email Templates
   - Click "Test" on your template
   - Send test email
   - If test fails, the issue is with EmailJS setup, not code

3. **Check Browser Console:**
   - Look for specific error messages
   - Copy error details
   - Check network tab for failed requests

4. **Verify EmailJS Account:**
   - Make sure account is verified
   - Check payment/billing status
   - Verify account is not suspended

---

## 📝 Next Steps

Once you identify the specific error from browser console, I can help fix it. Common issues:
- Template variable mismatch
- Service not connected
- Quota exceeded
- Invalid credentials



