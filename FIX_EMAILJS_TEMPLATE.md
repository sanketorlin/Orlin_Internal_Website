# 🔧 Fix EmailJS Template - Replace Hardcoded Values

## ❌ Current Problem

Your email shows:
- OTP: `123456` (hardcoded test value)
- Time: `11:45 AM` (fixed value)

This means your EmailJS template is NOT using the dynamic variables `{{passcode}}` and `{{time}}`.

## ✅ Solution: Update EmailJS Template

### Step 1: Go to EmailJS Dashboard
1. Open: https://dashboard.emailjs.com/admin
2. Sign in to your account

### Step 2: Open Your Template
1. Click **"Email Templates"** in the left sidebar
2. Find and click on your **"One-Time Password"** template (`template_k3brg2s`)

### Step 3: Update Template Content

**Replace the hardcoded values with template variables:**

**❌ WRONG (Current):**
```
To authenticate, please use the following One Time Password (OTP):

123456

This OTP will be valid for 15 minutes till 11:45 AM
```

**✅ CORRECT (Should be):**
```
To authenticate, please use the following One Time Password (OTP):

{{passcode}}

This OTP will be valid for 15 minutes till {{time}}
```

### Step 4: Template Variables to Use

Make sure your template uses these **exact** variable names:
- `{{passcode}}` - for the OTP code (6 digits)
- `{{email}}` - for the recipient email (optional, but available)
- `{{time}}` - for the expiration time

### Step 5: Save Template
1. Click **"Save"** or **"Update"** button
2. Make sure the template is **linked to your service** (`service_mryzznl`)

### Step 6: Test Template
1. Click **"Test"** button in EmailJS dashboard
2. Fill in test values:
   - `passcode`: `123456` (for testing)
   - `email`: `your-email@example.com`
   - `time`: `Jan 27, 2026, 2:00 PM`
3. Send test email
4. Verify the test email shows the values you entered (not hardcoded)

## 📋 Complete Template Example

Here's what your template content should look like:

```
OTP for your APPAREL PRIVATE LIMITED authentication

To authenticate, please use the following One Time Password (OTP):

{{passcode}}

This OTP will be valid for 15 minutes till {{time}}

Do not share this OTP with anyone. If you didn't make this request, you can safely ignore this email.
APPAREL PRIVATE LIMITED will never contact you about this email or ask for any login codes or links. Beware of phishing scams.

Thanks for visiting APPAREL PRIVATE LIMITED!

Note:- If you experience any issues, please reach out to Sanket Ugalmugale or Alpesh Parmar for support.
```

**Key Points:**
- Use `{{passcode}}` instead of `123456`
- Use `{{time}}` instead of `11:45 AM`
- The variable names must match exactly: `{{passcode}}` and `{{time}}` (case-sensitive)

## 🧪 After Fixing

1. **Save the template** in EmailJS dashboard
2. **Request a new OTP** from your app
3. **Check your email** - it should now show the actual OTP (not "123456")
4. **Verify the OTP** - it should work now!

