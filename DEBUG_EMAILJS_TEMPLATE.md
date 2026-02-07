# 🔍 Debug: OTP Not Showing in Email

## ❌ Current Issue

Email is received but:
- OTP code is **blank** (where `{{passcode}}` should be)
- Expiration time is **blank** (where `{{time}}` should be)

This means EmailJS is **not replacing** the template variables.

---

## ✅ Step 1: Test from EmailJS Dashboard

**This is the most important test!**

1. Go to EmailJS → Email Templates
2. Click **"Test It"** on your template
3. **Fill in ALL parameters:**
   - **passcode:** `123456` (type this manually)
   - **time:** `11:45 AM` (type this manually)
   - **email:** `sanketugalmugale8412@gmail.com`
4. Click **"Send Test Email"**
5. Check your email

**Expected Result:**
- Email should show: `123456` ✅
- Email should show: `11:45 AM` ✅

**If test email shows OTP:**
- ✅ Template is working correctly
- ✅ Issue is with code sending parameters
- Continue to Step 2

**If test email still shows blank:**
- ❌ Template is not configured correctly
- ❌ Need to fix template in EmailJS
- See Step 3

---

## ✅ Step 2: Check Browser Console

1. **Open browser console** (F12)
2. **Try sending OTP** from your app
3. **Look for these logs:**
   ```
   📧 Template Parameters: { passcode: "396181", email: "...", time: "..." }
   📧 OTP: 396181
   📧 Email: ...
   📧 Expiration: ...
   ✅ EmailJS Response: { status: 200, text: "OK" }
   ```

**What to check:**
- ✅ Are parameters being sent? (should see `passcode: "396181"`)
- ✅ Is EmailJS response 200? (means email was sent)
- ❌ Any errors? (copy the error message)

---

## ✅ Step 3: Verify Template Configuration

### In EmailJS Template Editor:

1. Go to EmailJS → Email Templates
2. Click **"Edit Content"**
3. Make sure the content shows:

```
To authenticate, please use the following One Time Password (OTP):

{{passcode}}

This OTP will be valid for 15 minutes till {{time}}.
```

**Important:**
- `{{passcode}}` must be on its own line (not hidden)
- `{{time}}` must be after "till"
- Both must use double curly braces: `{{ }}`
- No spaces: `{{passcode}}` ✅ (not `{{ passcode }}` ❌)

4. **Click "Save"**

---

## ✅ Step 4: Check Template Settings

1. Go to EmailJS → Email Templates
2. Click on your template
3. Go to **"Settings"** tab
4. Check:
   - ✅ Template is **Active**
   - ✅ Template is **Saved**
   - ✅ No errors shown

---

## 🔧 Common Fixes

### Fix 1: Template Not Saved
- Click **"Save"** button after editing
- Wait for "Template saved" confirmation

### Fix 2: Variables Not Visible
- Make sure `{{passcode}}` is on its own line
- Not hidden in HTML comments
- Not inside a conditional block

### Fix 3: Wrong Variable Names
- Must be exactly: `{{passcode}}` (not `{{passCode}}` or `{{Passcode}}`)
- Must be exactly: `{{time}}` (not `{{Time}}` or `{{TIME}}`)

### Fix 4: Code Not Sending Parameters
- Check browser console for parameters
- Verify parameters match template variable names

---

## 🧪 Quick Test

**Test from EmailJS Dashboard:**
1. Go to EmailJS → Templates → "Test It"
2. Fill in:
   - passcode: `999999`
   - time: `12:00 PM`
   - email: `your@email.com`
3. Send test email
4. **Does email show `999999`?**
   - ✅ Yes → Template works, issue is with code
   - ❌ No → Template needs to be fixed

---

## 📝 What to Share

If still not working, share:
1. **Browser console logs** (F12) when sending OTP
2. **EmailJS test result** (does test email show OTP?)
3. **Template screenshot** (showing where `{{passcode}}` is)

This will help identify the exact issue!



