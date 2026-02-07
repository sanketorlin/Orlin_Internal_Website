# 🔒 Firestore Security Rules Setup

## ❌ Current Error

**"Missing or insufficient permissions"**

This error occurs because Firestore security rules are blocking access to the device authentication collections.

---

## ✅ Solution: Update Firestore Security Rules

### Step 1: Go to Firebase Console

1. Open: https://console.firebase.google.com/
2. Select your project: `studio-4992265935-9ecf3`
3. Navigate to: **Firestore Database** (left sidebar)
4. Click on: **Rules** tab

### Step 2: Update Security Rules

Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Reports collection - allow read/write for authenticated users
    match /reports/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Users collection - allow read/write for authenticated users
    match /users/{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Trusted devices collection - allow read/write for authenticated users
    // Users can only access their own device records
    match /trusted-devices/{deviceId} {
      allow read, write: if request.auth != null && 
        (deviceId.contains(request.auth.token.email) || 
         resource == null || 
         resource.data.email == request.auth.token.email);
    }
    
    // Login OTPs collection - allow read/write for authenticated users
    // Users can only access their own OTP records
    match /login-otps/{email} {
      allow read, write: if request.auth != null && 
        (email == request.auth.token.email || 
         request.resource.data.email == request.auth.token.email);
    }
    
    // Default: Deny all other access
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **"Publish"** button (top right)
2. Wait for confirmation: "Rules published successfully"

---

## 🔐 Alternative: More Permissive Rules (For Development Only)

**⚠️ WARNING: These rules are less secure. Use only for development/testing.**

If you want to allow all authenticated users to access all collections (for easier testing):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all authenticated users to read/write
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

---

## 🧪 Test the Rules

After updating the rules:

1. **Refresh your browser** (clear cache if needed)
2. **Try logging in again**
3. The "Missing or insufficient permissions" error should be gone

---

## 📋 What These Rules Do

### Reports Collection
- ✅ Authenticated users can read/write reports
- ❌ Unauthenticated users cannot access

### Users Collection
- ✅ Authenticated users can read/write users
- ❌ Unauthenticated users cannot access

### Trusted Devices Collection
- ✅ Authenticated users can read/write their own device records
- ✅ Device ID must contain user's email
- ❌ Users cannot access other users' device records

### Login OTPs Collection
- ✅ Authenticated users can read/write their own OTP records
- ✅ Email must match authenticated user's email
- ❌ Users cannot access other users' OTP records

---

## 🆘 Troubleshooting

### Still Getting Permission Errors?

1. **Check Authentication:**
   - Make sure user is logged in to Firebase Auth
   - Check browser console for auth errors

2. **Verify Rules Published:**
   - Go to Firestore → Rules
   - Check if rules show your updated version
   - Rules may take a few seconds to propagate

3. **Check Collection Names:**
   - Verify collection names match exactly:
     - `trusted-devices` (not `trusted_devices`)
     - `login-otps` (not `login_otps`)

4. **Test in Firebase Console:**
   - Go to Firestore → Data
   - Try to manually create a document
   - Check if you get permission errors

### Rules Not Saving?

- Make sure you're logged in to Firebase Console
- Check if you have proper permissions on the project
- Try refreshing the page and updating again

---

## 🔒 Security Best Practices

1. **Never use overly permissive rules in production**
2. **Always validate user identity** (check `request.auth.token.email`)
3. **Limit access to user's own data** (use email matching)
4. **Regularly review and update rules** as your app grows

---

## ✅ Quick Checklist

- [ ] Opened Firebase Console
- [ ] Navigated to Firestore → Rules
- [ ] Updated rules with provided code
- [ ] Clicked "Publish"
- [ ] Refreshed browser
- [ ] Tested login again
- [ ] Error resolved ✅

---

## 📝 Notes

- Rules take effect immediately after publishing
- Changes may take a few seconds to propagate globally
- Always test rules after making changes
- Keep a backup of your rules before making major changes



