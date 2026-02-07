# 🧪 Quick Test: Is EmailJS Working Locally?

## ✅ EmailJS Works from Localhost!

**Important:** Testing locally does **NOT** prevent EmailJS from working. EmailJS works the same from:
- ✅ `localhost:3000` (your local dev server)
- ✅ `your-site.vercel.app` (deployed)

---

## 🧪 Quick Test Steps

### Step 1: Open Browser Console

1. **Start your website:** `npm run dev`
2. **Open:** `http://localhost:3000`
3. **Press F12** to open Developer Tools
4. **Go to Console tab**

### Step 2: Add a Test User

1. **Login** to your dashboard
2. **Open User Management** (Users icon 👥)
3. **Click "+ ADD NEW USER"**
4. **Fill in:**
   - Email: **Your own email** (so you can check if email arrives)
   - Name: Test User
   - Role: Sales
   - Password: test123456
   - Confirm: test123456
5. **Click "Add User"**

### Step 3: Check Console Logs

**Look for these messages in console:**

✅ **If Working:**
```
📧 Attempting to send welcome email via EmailJS...
📧 Recipient: your@email.com
📧 Template Parameters: {...}
✅ EmailJS HTTP Status: 200
✅ EmailJS Response Text: OK
✅ Welcome email sent successfully to: your@email.com
📧 Attempting to send OTP email via EmailJS...
✅ OTP email sent successfully
```

❌ **If Not Working:**
```
❌ Error sending welcome email: EmailJS error 404
OR
❌ Error sending welcome email: EmailJS error 401: Unauthorized
OR
EmailJS not configured. Welcome email not sent.
```

### Step 4: Check Your Email

1. **Check inbox** for the email address you used
2. **Check spam/junk folder** (emails often go there)
3. **Wait 1-2 minutes** (emails can take time)

### Step 5: Check EmailJS Dashboard

1. **Go to:** https://www.emailjs.com/
2. **Login** to your account
3. **Click:** Email History (in left menu)
4. **Check:** Do you see recent emails?

---

## 🔍 What the Logs Tell You

### Status 200 + "OK" = ✅ Working!
```
✅ EmailJS HTTP Status: 200
✅ EmailJS Response Text: OK
```
**Meaning:** EmailJS received the request and sent the email. Check your inbox!

### Status 404 = ❌ Template/Service Not Found
```
❌ EmailJS error 404
```
**Meaning:** 
- Template ID is wrong, OR
- Service ID is wrong, OR
- Template not linked to service

**Fix:** Check EmailJS dashboard → Verify Service ID and Template ID

### Status 401 = ❌ Unauthorized
```
❌ EmailJS error 401: Unauthorized
```
**Meaning:** Public key is wrong

**Fix:** Check `src/config/emailjs.config.js` → Verify public key matches EmailJS dashboard

### No Logs = ❌ EmailJS Not Configured
```
EmailJS not configured. Welcome email not sent.
```
**Meaning:** Configuration file has placeholder values

**Fix:** Update `src/config/emailjs.config.js` with real values

---

## 🎯 Quick Diagnostic

**Copy and paste this in browser console (F12) after adding a user:**

```javascript
// Check EmailJS config
console.log('EmailJS Config:', {
  enabled: true, // Check if enabled in config
  publicKey: '9L_svQROxlVCH6l2l', // Your actual key
  serviceId: 'service_mryzznl', // Your actual service ID
  templateId: 'template_k3brg2s' // Your actual template ID
});
```

**Then check:**
- [ ] All values are real (not placeholders)
- [ ] Values match EmailJS dashboard exactly
- [ ] enabled is true

---

## ✅ Expected Behavior

### When It Works:

1. **Console shows:**
   - ✅ Status 200
   - ✅ Response "OK"
   - ✅ "Welcome email sent successfully"

2. **EmailJS Dashboard shows:**
   - ✅ Email in history
   - ✅ Status: Sent/Delivered

3. **Your Email Inbox:**
   - ✅ Welcome email received (check spam too!)

### When It Doesn't Work:

1. **Console shows:**
   - ❌ Error message
   - ❌ Status 404/401/400

2. **EmailJS Dashboard shows:**
   - ❌ No email in history, OR
   - ❌ Failed email with error

3. **Your Email Inbox:**
   - ❌ No email received

---

## 🔧 Common Fixes

### Fix 1: Template Variables Don't Match

**Problem:** Your EmailJS template uses different variable names

**Solution:**
1. Go to EmailJS dashboard → Email Templates
2. Check what variables your template uses
3. Update `src/utils/welcomeEmailService.js` to match

### Fix 2: Wrong Template ID

**Problem:** Using OTP template for welcome email

**Solution:**
1. Create a separate welcome email template in EmailJS
2. Update `template_id` in welcome email service
3. OR use the same template but make sure variables match

### Fix 3: Service Not Active

**Problem:** EmailJS service is paused or not configured

**Solution:**
1. Go to EmailJS dashboard → Email Services
2. Verify service is active
3. Check service settings

---

## 📝 Test Checklist

```
[ ] Browser console shows Status 200
[ ] Browser console shows "OK" response
[ ] Browser console shows "Welcome email sent successfully"
[ ] EmailJS dashboard shows email in history
[ ] Email received in inbox (or spam folder)
[ ] OTP email also sent (check console)
```

**If all checked:** ✅ EmailJS is working! The issue is elsewhere.

**If any unchecked:** ❌ Check the specific issue above.

---

## 💡 Pro Tip

**Test with your own email first:**
- Use your personal email when adding test users
- This way you can verify emails are actually being sent
- Check both inbox and spam folder

---

## 🆘 Still Not Working?

If emails still don't send:

1. **Share console logs** - What exact error do you see?
2. **Check EmailJS dashboard** - What does email history show?
3. **Verify configuration** - All values correct?
4. **Test template** - Does OTP email work? (If yes, template is fine)

**Remember:** Local vs deployed makes NO difference! 🚀

