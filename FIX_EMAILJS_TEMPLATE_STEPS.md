# ✅ Fix EmailJS Template - Step by Step

## Your Template Looks Correct!

Your template has:
- ✅ `{{passcode}}` - Correct!
- ✅ `{{time}}` - Correct!

But the OTP is showing blank. Here's how to fix it:

---

## 🔧 Step 1: Save the Template

1. Go to EmailJS → Email Templates
2. Click on "One-Time Password" template
3. Make sure you're in "Edit Content" mode
4. **IMPORTANT:** Click **"Save"** button (top right)
5. Wait for "Template saved" confirmation

**Why:** Sometimes templates aren't saved, so changes don't apply.

---

## 🧪 Step 2: Test with Actual Values

1. In EmailJS → Email Templates
2. Click **"Test It"** button
3. Fill in the test parameters:
   - **passcode:** `123456` (type a test number)
   - **time:** `11:45 AM` (type a test time)
   - **email:** `sanketugalmugale8412@gmail.com`
4. Click **"Send Test Email"**
5. Check your email

**Expected Result:**
- Email should show: `123456` (the test OTP)
- Email should show: `11:45 AM` (the test time)

**If test email shows OTP correctly:**
- ✅ Template is working!
- ✅ Issue is with code sending parameters

**If test email still shows blank:**
- ❌ Template needs to be fixed
- Continue to Step 3

---

## 🔍 Step 3: Verify Template Content

1. Go to EmailJS → Email Templates
2. Click **"Edit Content"**
3. Make sure the content shows:

```
To authenticate, please use the following One Time Password (OTP):

{{passcode}}

This OTP will be valid for 15 minutes till {{time}}.
```

**Important:**
- `{{passcode}}` must be on its own line or clearly visible
- `{{time}}` must be after "till"
- Both must be in double curly braces: `{{ }}`

4. Click **"Save"**

---

## 🔄 Step 4: Test from Your App

1. **Refresh your browser** (Ctrl+F5)
2. **Open browser console** (F12)
3. **Clear browser data** (to simulate new device)
4. **Enter email** and click "Send OTP"
5. **Check console** - you should see:
   ```
   📧 Template Parameters: { passcode: "396181", email: "...", time: "..." }
   ```
6. **Check your email** - OTP should appear

---

## 🐛 Common Issues

### Issue 1: Template Not Saved
**Symptom:** Changes don't appear
**Fix:** Click "Save" button after editing

### Issue 2: Test Without Values
**Symptom:** Test email shows blank
**Fix:** Fill in test parameters (passcode, time) before testing

### Issue 3: Variables Not Replaced
**Symptom:** Email shows `{{passcode}}` as text
**Fix:** Make sure variables are exactly `{{passcode}}` and `{{time}}` (not `{passcode}` or `{{ passcode }}`)

### Issue 4: Code Not Sending Parameters
**Symptom:** Email sent but blank
**Fix:** Check browser console for errors

---

## ✅ Quick Checklist

- [ ] Template is saved (clicked "Save" button)
- [ ] Test email from EmailJS dashboard works (shows OTP)
- [ ] Template has `{{passcode}}` on its own line
- [ ] Template has `{{time}}` after "till"
- [ ] Browser console shows parameters being sent
- [ ] Browser refreshed after changes

---

## 🎯 What to Do Right Now

1. **Go to EmailJS → Email Templates**
2. **Click "Save"** (even if you didn't change anything)
3. **Click "Test It"**
4. **Fill in:**
   - passcode: `123456`
   - time: `11:45 AM`
   - email: `sanketugalmugale8412@gmail.com`
5. **Send test email**
6. **Check if OTP appears in email**

If test email shows `123456`, then template is working! The issue is elsewhere.

If test email still shows blank, then we need to fix the template content.

---

## 📝 Template Content Should Look Like:

```
To authenticate, please use the following One Time Password (OTP):

{{passcode}}

This OTP will be valid for 15 minutes till {{time}}.
```

Make sure `{{passcode}}` is clearly visible and on its own line (not hidden or in a comment).

