# 🔧 Fix: "auth/invalid-credential" Error

## ❌ Current Error

**"Firebase: Error (auth/invalid-credential)"**

This error means the email/password combination is incorrect or the user doesn't exist in Firebase Authentication.

---

## 🔍 Why This Happens When Moving to Another Laptop

If it worked on another laptop but not on this one, common causes are:

1. **User account doesn't exist in Firebase** - The account might have been created locally or in a different Firebase project
2. **Wrong password** - Password might be different or forgotten
3. **Different Firebase project** - The other laptop might be using a different Firebase project
4. **User account was deleted** - The account might have been removed from Firebase

---

## ✅ Solution 1: Verify User Exists in Firebase

### Step 1: Check Firebase Console

1. **Go to:** https://console.firebase.google.com/
2. **Select your project:** `studio-4992265935-9ecf3`
3. **Navigate to:** **Authentication** → **Users** tab
4. **Look for your email address** in the list

### Step 2: If User Doesn't Exist - Create It

1. Click **"Add user"** button (top right)
2. Enter:
   - **Email:** Your email address (e.g., `your@email.com`)
   - **Password:** Choose a secure password
3. Click **"Add user"**
4. **Important:** Remember this password - you'll need it to login

### Step 3: Add User to users.json

Edit `src/config/users.json` and add your user:

```json
{
  "users": {
    "your@email.com": {
      "email": "your@email.com",
      "role": "team-head",
      "name": "Your Name"
    }
  }
}
```

---

## ✅ Solution 2: Reset Password

If the user exists but you don't remember the password:

### Option A: Reset via Firebase Console

1. Go to **Firebase Console** → **Authentication** → **Users**
2. Find your user email
3. Click the **three dots** (⋮) next to the user
4. Click **"Reset password"**
5. Check your email for the reset link

### Option B: Reset via App

1. On the login page, click **"Forgot Password?"**
2. Enter your email address
3. Check your email inbox (and spam folder) for the reset link
4. Click the link and set a new password

---

## ✅ Solution 3: Verify Firebase Configuration

Make sure you're using the correct Firebase project:

1. **Check `src/firebase/config.js`** - Should have:
   ```javascript
   projectId: "studio-4992265935-9ecf3"
   ```

2. **Verify in Firebase Console:**
   - Go to Firebase Console
   - Check Project Settings (gear icon)
   - Compare the `projectId` with your config file

3. **If different projects:**
   - Either use the same Firebase project on both laptops
   - Or create the user in the current Firebase project

---

## ✅ Solution 4: Check Login Flow

For **new devices**, you must follow this flow:

1. **Enter Email** → Enter your email address
2. **Click "Send OTP"** → Don't click "Login" yet
3. **Enter OTP** → Enter the 6-digit code (check email or UI)
4. **Enter Password** → After OTP verification, enter password
5. **Click "Login"** → Complete login

**Important:** On a new device, you cannot login directly with password. You must verify with OTP first.

---

## 🔍 Troubleshooting Checklist

- [ ] User exists in Firebase Authentication Console
- [ ] User added to `src/config/users.json` with correct role
- [ ] Using correct email address (case-sensitive)
- [ ] Using correct password
- [ ] Following OTP flow for new device (not direct login)
- [ ] Firebase project ID matches in config file
- [ ] Email/Password authentication enabled in Firebase Console
- [ ] Internet connection is working
- [ ] Browser cache cleared (try Ctrl+Shift+Delete)

---

## 🆘 Still Having Issues?

### Check Browser Console

1. Press **F12** to open Developer Tools
2. Go to **Console** tab
3. Look for detailed error messages
4. Share the full error message for more help

### Common Error Messages:

- **"auth/user-not-found"** → User doesn't exist in Firebase
- **"auth/wrong-password"** → Password is incorrect
- **"auth/invalid-credential"** → Email/password combination is wrong
- **"auth/network-request-failed"** → Internet connection issue

### Verify Firebase Setup

1. **Check Authentication is enabled:**
   - Firebase Console → Authentication → Sign-in method
   - Make sure "Email/Password" is **Enabled**

2. **Check API Key:**
   - Firebase Console → Project Settings → General
   - Compare API key with `src/firebase/config.js`

---

## 📝 Quick Fix Steps

1. **Go to Firebase Console:** https://console.firebase.google.com/
2. **Select project:** `studio-4992265935-9ecf3`
3. **Authentication** → **Users** → **Add user**
4. **Enter email and password**
5. **Add user to `src/config/users.json`**
6. **Refresh browser**
7. **Login with email** → **Send OTP** → **Enter OTP** → **Enter password** → **Login**

---

## 💡 Pro Tips

- **Always create users in Firebase Console first** before trying to login
- **Use the same Firebase project** on all devices
- **Remember passwords** or use a password manager
- **For new devices**, always follow the OTP flow
- **Check spam folder** for OTP emails

---

**After fixing, refresh your browser and try logging in again!** 🚀

