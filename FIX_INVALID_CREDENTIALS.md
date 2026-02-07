# 🔧 Fix: "auth/invalid-credential" Error

## ❌ Current Error

**"Firebase: Error (auth/invalid-credential)"**

This means:
- Email/password combination is incorrect, OR
- User doesn't exist in Firebase Authentication

---

## ✅ Solution 1: Create User in Firebase Console

### Step 1: Go to Firebase Console

1. Open: https://console.firebase.google.com/
2. Select your project: `studio-4992265935-9ecf3`
3. Navigate to: **Authentication** → **Users** tab

### Step 2: Add User

1. Click **"Add user"** button (top right)
2. Enter:
   - **Email:** `sanketugalmugale8412@gmail.com`
   - **Password:** (choose a secure password)
3. Click **"Add user"**

### Step 3: Add User to users.json

Edit `src/config/users.json` and add:

```json
{
  "users": {
    "sanketugalmugale8412@gmail.com": {
      "email": "sanketugalmugale8412@gmail.com",
      "role": "team-head",
      "name": "Sanket"
    }
  }
}
```

### Step 4: Login

1. Refresh your browser
2. Enter email: `sanketugalmugale8412@gmail.com`
3. Click **"Send OTP"** (for new device)
4. Enter OTP code (shown in UI)
5. Enter password
6. Click **"Login"**

---

## ✅ Solution 2: Use Correct Login Flow for New Device

For a **new device**, you MUST follow this flow:

### Step 1: Enter Email
- Enter: `sanketugalmugale8412@gmail.com`

### Step 2: Click "Send OTP" (NOT "Login")
- Don't click "Login" button yet
- Click **"Send OTP"** button instead
- OTP will appear in the UI

### Step 3: Enter OTP
- Enter the 6-digit OTP code shown in the UI
- Click **"Verify OTP"**

### Step 4: Enter Password
- After OTP verification, enter your password
- Click **"Login"**

---

## ✅ Solution 3: Check Existing Users

### Check if user exists:

1. Go to Firebase Console
2. **Authentication** → **Users**
3. Look for: `sanketugalmugale8412@gmail.com`

### If user exists:
- Make sure you're using the correct password
- Try password reset if needed

### If user doesn't exist:
- Create user (Solution 1 above)

---

## 🔍 Troubleshooting

### Error: "User not found"
- User doesn't exist in Firebase Authentication
- **Fix:** Create user in Firebase Console

### Error: "Wrong password"
- Password is incorrect
- **Fix:** Use correct password or reset password

### Error: "Invalid credential"
- Email/password combination is wrong
- **Fix:** Verify email and password are correct

---

## 📝 Quick Checklist

- [ ] User exists in Firebase Authentication
- [ ] User added to `users.json` with correct role
- [ ] Using correct email address
- [ ] Using correct password
- [ ] Following OTP flow for new device (not direct login)
- [ ] Firestore rules updated (if still seeing permission errors)

---

## 🆘 Still Having Issues?

1. **Check browser console** (F12) for detailed error messages
2. **Verify user in Firebase Console** → Authentication → Users
3. **Try password reset** if password is forgotten
4. **Clear browser cache** and try again



