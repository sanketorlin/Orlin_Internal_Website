# 🔧 Firebase Password Reset Email Troubleshooting Guide

## Issue: Not Receiving Password Reset Email

If you're not receiving password reset emails, follow these steps:

---

## ✅ Step 1: Check Firebase Console Settings

### 1.1 Enable Email Authentication
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `studio-4992265935-9ecf3`
3. Navigate to **Authentication** > **Sign-in method**
4. Make sure **Email/Password** is **Enabled**
5. Click on **Email/Password** and verify it's enabled

### 1.2 Configure Email Templates
1. In Firebase Console, go to **Authentication** > **Templates**
2. Click on **Password reset**
3. Make sure the template is **Active**
4. Customize the email template if needed
5. Save changes

### 1.3 Check Email Sending Quota
1. Go to **Authentication** > **Users**
2. Check if there are any quota warnings
3. Firebase free tier allows: **100 emails/day**
4. If quota exceeded, wait 24 hours or upgrade plan

---

## ✅ Step 2: Verify User Exists in Firebase

1. Go to **Authentication** > **Users**
2. Search for the email address you're trying to reset
3. If user doesn't exist:
   - User needs to be created first via **UserManager** in the app
   - Or create manually in Firebase Console

---

## ✅ Step 3: Check Email Settings

### 3.1 Check Spam/Junk Folder
- Password reset emails often go to spam
- Check all email folders
- Add `noreply@studio-4992265935-9ecf3.firebaseapp.com` to contacts

### 3.2 Verify Email Address
- Make sure you're using the **exact email** registered in Firebase
- Check for typos
- Try lowercase version of email

---

## ✅ Step 4: Test Email Sending

### Option 1: Check Browser Console
1. Open browser console (F12)
2. Try password reset
3. Look for error messages
4. Check for: `✅ Password reset email sent successfully`

### Option 2: Check Firebase Console Logs
1. Go to Firebase Console
2. Navigate to **Authentication** > **Users**
3. Find the user
4. Check if password reset was attempted

---

## ✅ Step 5: Common Issues & Solutions

### Issue: "User not found"
**Solution:** 
- User must exist in Firebase Authentication
- Create user via UserManager in the app first
- Or create manually in Firebase Console

### Issue: "Quota exceeded"
**Solution:**
- Wait 24 hours for quota reset
- Upgrade Firebase plan for more emails
- Check Firebase Console > Usage

### Issue: Email not configured
**Solution:**
- Go to Firebase Console > Authentication > Templates
- Enable "Password reset" template
- Save and try again

### Issue: Email goes to spam
**Solution:**
- Check spam/junk folder
- Add Firebase email to contacts
- Check email provider's spam filters

---

## 🔧 Quick Fix: Manual Password Reset (Admin Only)

If emails aren't working, Super Admin can reset password via UserManager:

1. Login as Super Admin (team-head role)
2. Click **Users** icon in header
3. Find the user
4. Click **🔒 Lock icon** (Send Password Reset Email)
5. Or manually set new password in Firebase Console

---

## 📧 Firebase Email Configuration

### Default Email Settings:
- **From:** `noreply@studio-4992265935-9ecf3.firebaseapp.com`
- **Subject:** "Reset your password"
- **Link expires:** 1 hour

### Customize Email Template:
1. Firebase Console > Authentication > Templates
2. Click "Password reset"
3. Customize subject, body, and styling
4. Save changes

---

## 🆘 Still Not Working?

1. **Check Firebase Console** for error logs
2. **Verify API key** is correct in `src/firebase/config.js`
3. **Check network** - ensure no firewall blocking Firebase
4. **Try different email** - test with another email address
5. **Check browser console** for detailed error messages

---

## ✅ Success Indicators

When password reset works correctly:
- ✅ Success message appears: "Password reset email sent successfully"
- ✅ Email arrives within 1-5 minutes
- ✅ Email contains link to reset password
- ✅ Link opens password reset page
- ✅ New password can be set

---

## 📝 Notes

- Firebase free tier: 100 emails/day
- Emails may take 1-5 minutes to arrive
- Reset links expire after 1 hour
- Only one active reset link per user at a time



