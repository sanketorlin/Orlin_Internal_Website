# ⚡ Quick Testing Guide - User Creation Feature

## 🎯 5-Minute Test Before Push

### Step 1: Start & Login (1 min)

```bash
# Terminal 1: Start dev server
npm run dev

# Browser: Login with team-head account
# Email: orlinadmin@gmail.com (or your admin account)
# Password: [your password]
```

### Step 2: Open User Management (30 sec)

1. **Look for Users icon** 👥 in the top-right header
2. **Click it** - User Management window opens
3. **Verify** you see the user list

### Step 3: Add Test User (2 min)

1. **Click "+ ADD NEW USER"**
2. **Fill form:**
   ```
   Email: test123@example.com
   Name: Test User
   Role: Sales
   Password: test123456
   Confirm: test123456
   ```
3. **Click "Add User"**
4. **Check:**
   - ✅ Success message appears
   - ✅ Shows email and password
   - ✅ User appears in list

### Step 4: Verify in Firebase (1 min)

1. **Open:** https://console.firebase.google.com/
2. **Go to:** Authentication → Users
3. **Check:** `test123@example.com` exists ✅

### Step 5: Test Login (30 sec)

1. **Open incognito/private window**
2. **Login with:**
   - Email: `test123@example.com`
   - Password: `test123456`
3. **Follow OTP flow** (if new device)
4. **Verify:** Login successful ✅

---

## ✅ If All Steps Pass → Ready to Push!

## ❌ If Any Step Fails → Check Error & Fix

---

## 🔍 Quick Error Check

### Error: "Email already registered"
- **Meaning:** User exists in Firebase
- **Action:** Use different email or check Firebase Console

### Error: "Password too weak"
- **Meaning:** Password < 6 characters
- **Action:** Use longer password

### Error: "Network error"
- **Meaning:** Internet/Firebase connection issue
- **Action:** Check connection, try again

---

## 📝 Test Checklist (Copy & Check)

```
[ ] Dev server starts without errors
[ ] Can login with admin account
[ ] User Management button visible (team-head only)
[ ] Can open User Management
[ ] Can add new user successfully
[ ] User appears in Firebase Authentication
[ ] User appears in users list
[ ] Can login with new user credentials
[ ] No console errors
```

---

**Time: ~5 minutes | Status: Ready/Not Ready**

