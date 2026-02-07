# Firebase Authentication Setup Guide

## ✅ Firebase Authentication is Now Implemented!

The website now uses Firebase for secure email/password authentication.

---

## 🔧 Setup Steps (Required)

### Step 1: Create Firebase Project

1. Go to: https://console.firebase.google.com/
2. Click "Add project" or "Create a project"
3. Enter project name (e.g., "bi-dashboard-portal")
4. Click "Continue"
5. Disable Google Analytics (optional) or enable it
6. Click "Create project"
7. Wait for project creation, then click "Continue"

### Step 2: Enable Email/Password Authentication

1. In Firebase Console, click "Authentication" in left menu
2. Click "Get started" (if first time)
3. Click "Sign-in method" tab
4. Click on "Email/Password"
5. **Enable** "Email/Password" (toggle ON)
6. Click "Save"

### Step 3: Get Firebase Configuration

1. In Firebase Console, click the gear icon ⚙️ next to "Project Overview"
2. Click "Project settings"
3. Scroll down to "Your apps" section
4. Click the web icon `</>` to add a web app
5. Register app:
   - App nickname: "BI Dashboard Portal" (or any name)
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"
6. Copy the `firebaseConfig` object

### Step 4: Update Firebase Config File

1. Open: `src/firebase/config.js`
2. Replace the placeholder values with your Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

3. Save the file

### Step 5: Create Users in Firebase

#### Option A: Create Users via Firebase Console
1. Go to Authentication → Users
2. Click "Add user"
3. Enter email and password
4. Click "Add user"
5. Repeat for all users

#### Option B: Let Users Sign Up
- Users can sign up directly from the login page
- You'll need to add a sign-up form (or I can add it)

#### Option C: Import Users
1. Go to Authentication → Users
2. Click "..." menu → "Import users"
3. Upload a CSV file with user data

### Step 6: Update User Roles

After creating users in Firebase, update `src/config/users.json`:

```json
{
  "users": {
    "user1@example.com": {
      "email": "user1@example.com",
      "role": "team-head",
      "name": "User One"
    },
    "user2@example.com": {
      "email": "user2@example.com",
      "role": "sales",
      "name": "User Two"
    }
  }
}
```

**Important:** Email addresses must match Firebase Authentication emails.

---

## ✅ Testing

1. Start the server: `npm run dev`
2. Try logging in with a Firebase user
3. Test password reset (check email for reset link)

---

## 🔐 Features Now Available

✅ **Real Email Authentication** - Secure Firebase auth
✅ **Password Reset via Email** - Real email links (not OTP)
✅ **Email Verification** - Optional email verification
✅ **Secure Password Storage** - Firebase handles security
✅ **Cross-Device Sync** - Works across all devices
✅ **Production Ready** - Enterprise-grade security

---

## 📧 Password Reset Flow

1. User clicks "Forgot Password?"
2. Enters email address
3. Firebase sends password reset email
4. User clicks link in email
5. User sets new password
6. User can login with new password

**Note:** Firebase uses email links, not OTP codes.

---

## 🆘 Troubleshooting

### "Firebase: Error (auth/invalid-api-key)"
- Check your Firebase config in `src/firebase/config.js`
- Make sure all values are correct

### "Firebase: Error (auth/operation-not-allowed)"
- Go to Firebase Console → Authentication → Sign-in method
- Enable "Email/Password" provider

### "User not found" but user exists in Firebase
- Check email spelling (case-sensitive)
- Make sure user exists in Firebase Authentication
- Check `src/config/users.json` has matching email

### Password reset email not received
- Check spam folder
- Verify email address is correct
- Check Firebase Console → Authentication → Templates for email settings

---

## 🔄 Switching Back to Local Auth

If you want to switch back to local authentication:

1. Edit `src/utils/auth.js`
2. Change imports from `firebaseAuth` to `localAuth`
3. Uncomment: `localAuth.initializeDefaultUsers();`

---

## 📚 Additional Resources

- Firebase Docs: https://firebase.google.com/docs/auth
- Firebase Console: https://console.firebase.google.com/
- Firebase Support: https://firebase.google.com/support

---

## ✅ You're All Set!

Once you complete the setup steps above, Firebase authentication will work perfectly!



