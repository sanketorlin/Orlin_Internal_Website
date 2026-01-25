# 🔥 Firebase Setup Guide - Fix API Key Error

## ❌ Current Error

You're seeing: `Firebase: Error (auth/api-key-not-valid.-please-pass-a-valid-api-key.)`

This means Firebase is not configured with valid credentials.

---

## ✅ Solution: Configure Firebase

### Step 1: Go to Firebase Console

1. **Open:** https://console.firebase.google.com/
2. **Sign in** with your Google account
3. **Create a new project** (or select existing):
   - Click "Add Project" or select existing
   - Enter project name (e.g., "BI Dashboard Portal")
   - Click "Continue"
   - Follow the setup wizard
   - Click "Create Project"

### Step 2: Enable Email/Password Authentication

1. **In Firebase Console**, click **"Authentication"** (left sidebar)
2. Click **"Get started"** (if first time)
3. Click **"Sign-in method"** tab
4. Click on **"Email/Password"**
5. **Enable** "Email/Password" (toggle ON)
6. **Optional:** Enable "Email link (passwordless sign-in)" if desired
7. Click **"Save"**

### Step 3: Get Your Firebase Configuration

1. **Click the gear icon** ⚙️ (Project Settings) in left sidebar
2. **Scroll down** to "Your apps" section
3. **Click the Web icon** `</>` (or "Add app" → Web)
4. **Register app:**
   - Enter app nickname (e.g., "BI Dashboard")
   - **Don't check** "Also set up Firebase Hosting" (unless you want it)
   - Click **"Register app"**
5. **Copy the `firebaseConfig` object** that appears:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSy...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abc123"
   };
   ```

### Step 4: Update Your Project

1. **Open:** `src/firebase/config.js` in your project
2. **Replace** the placeholder values with your actual Firebase config:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",  // ← Your actual API key
  authDomain: "your-project.firebaseapp.com",  // ← Your actual domain
  projectId: "your-project-id",  // ← Your actual project ID
  storageBucket: "your-project.appspot.com",  // ← Your actual storage bucket
  messagingSenderId: "123456789",  // ← Your actual sender ID
  appId: "1:123456789:web:abc123"  // ← Your actual app ID
};
```

3. **Save the file**
4. **The website will automatically reload** (Vite hot reload)

---

## 🧪 Test the Setup

1. **Refresh your browser** (if needed)
2. **Try logging in** with:
   - Email: An email you've created in Firebase
   - Password: The password for that user

---

## 👤 Create Test Users

### Option 1: Via Firebase Console (Recommended for Testing)

1. Go to **Authentication** → **Users** tab
2. Click **"Add user"**
3. Enter:
   - **Email:** `john@example.com`
   - **Password:** (choose a password)
4. Click **"Add user"**
5. **Add user to `users.json`:**
   - Edit `src/config/users.json`
   - Add the email with role:
   ```json
   {
     "users": {
       "john@example.com": {
         "email": "john@example.com",
         "role": "team-head",
         "name": "John Doe"
       }
     }
   }
   ```

### Option 2: Via Sign-Up (If you add sign-up feature)

Users can register themselves, then you add them to `users.json` with appropriate roles.

---

## 🔒 Security Notes

- **Never commit** `src/firebase/config.js` with real keys to public repositories
- Use environment variables for production
- Keep your API keys secure

---

## ✅ Quick Checklist

- [ ] Firebase project created
- [ ] Email/Password authentication enabled
- [ ] Firebase config copied
- [ ] `src/firebase/config.js` updated with real values
- [ ] Test user created in Firebase
- [ ] User added to `users.json`
- [ ] Website reloaded
- [ ] Login tested successfully

---

## 🆘 Still Having Issues?

### Error: "Invalid API key"
- **Fix:** Make sure you copied the entire config object correctly
- **Fix:** Check for typos in the config values
- **Fix:** Ensure you're using the Web app config (not iOS/Android)

### Error: "User not found"
- **Fix:** Create the user in Firebase Authentication first
- **Fix:** Make sure email matches exactly (case-sensitive)

### Error: "Password is incorrect"
- **Fix:** Reset password via Firebase Console
- **Fix:** Use "Forgot Password?" feature in the app

---

**After updating the config, refresh your browser and try logging in again!** 🚀
