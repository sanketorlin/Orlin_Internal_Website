# 🔧 Fix: OTP Not Showing in Email

## ❌ Issue

Email is received but:
- OTP code is **missing** (blank)
- Expiration time is **missing** (shows "till .")

## ✅ Solution

The template variables need to be properly configured in EmailJS.

---

## Step 1: Check EmailJS Template

1. Go to EmailJS → Email Templates
2. Open "One-Time Password" template
3. Click **"Edit Content"**

### Verify Template Variables:

Your template should have:
- `{{passcode}}` - for the OTP code
- `{{time}}` - for expiration time
- `{{email}}` - for recipient email

**Make sure they're spelled exactly like this (case-sensitive):**
- `{{passcode}}` ✅ (not `{{passCode}}` or `{{Passcode}}`)
- `{{time}}` ✅ (not `{{Time}}` or `{{TIME}}`)
- `{{email}}` ✅ (not `{{Email}}` or `{{EMAIL}}`)

---

## Step 2: Update Template Content

In the template editor, make sure the content looks like this:

```html
To authenticate, please use the following One Time Password (OTP):

{{passcode}}

This OTP will be valid for 15 minutes till {{time}}.
```

**Important:** The variables must be in double curly braces: `{{variable_name}}`

---

## Step 3: Test from EmailJS Dashboard

1. Go to EmailJS → Email Templates
2. Click **"Test It"** button
3. Fill in the template parameters:
   - **passcode:** `123456` (test OTP)
   - **time:** `11:45 AM` (test time)
   - **email:** `your@email.com`
4. Click **"Send Test Email"**
5. Check if OTP appears in the email

**If test email shows OTP correctly:**
- Template is configured correctly
- Issue is with code sending parameters

**If test email still shows blank:**
- Template variables are not configured correctly
- Check spelling and format

---

## Step 4: Verify Code is Sending Parameters

The code should send:
```javascript
{
  passcode: "123456",  // The OTP code
  email: "user@email.com",  // Recipient email
  time: "11/15/2024, 11:45:00 AM"  // Expiration time
}
```

Check browser console (F12) when sending OTP to see what parameters are being sent.

---

## Step 5: Common Issues

### Issue 1: Variables Not in Template
**Fix:** Make sure `{{passcode}}` and `{{time}}` are actually in the template content

### Issue 2: Wrong Variable Names
**Fix:** Use exact names: `{{passcode}}`, `{{time}}`, `{{email}}`

### Issue 3: Template Not Saved
**Fix:** Click "Save" button after editing template

### Issue 4: Using Wrong Template
**Fix:** Make sure you're using template ID: `template_il5fdro`

---

## Quick Fix: Update Template

1. Go to EmailJS → Email Templates
2. Click on "One-Time Password"
3. Click "Edit Content"
4. Make sure content has:
   ```
   {{passcode}}
   ```
   and
   ```
   {{time}}
   ```
5. Click "Save"
6. Test again

---

## Test Checklist

- [ ] Template has `{{passcode}}` in content
- [ ] Template has `{{time}}` in content
- [ ] Template has `{{email}}` in "To Email" field
- [ ] Template is saved
- [ ] Test email from EmailJS dashboard shows OTP
- [ ] Code sends correct parameter names
- [ ] Browser console shows parameters being sent

