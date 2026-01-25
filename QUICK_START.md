# 🎯 Quick Start - See Website & Login

## 📋 Step-by-Step Instructions

### 1️⃣ Install Dependencies (First Time Only)

```bash
npm install
```

Wait for installation to complete (takes 1-2 minutes)

---

### 2️⃣ Start the Website

```bash
npm run dev
```

**What happens:**
- ✅ Server starts
- ✅ Browser opens automatically at `http://localhost:3000`
- ✅ You see the **Login Page**

---

### 3️⃣ Login Process (Visual Guide)

#### **Step 1: Enter Phone Number**
```
┌─────────────────────────────────┐
│   🔒 BI Dashboard Portal        │
│   Secure OTP Login              │
│                                 │
│   📱 Phone Number               │
│   ┌─────────────────────────┐   │
│   │ +1234567890            │   │
│   └─────────────────────────┘   │
│                                 │
│   [Send OTP]                    │
└─────────────────────────────────┘
```

**Enter:** Your phone number (must be in `users.json`)
- Format: `+1234567890` (with country code)
- Example: `+1234567890` or `+919876543210`

#### **Step 2: Receive OTP**
- Firebase sends SMS to your phone
- You'll see: "OTP sent to +1234567890"

#### **Step 3: Enter OTP**
```
┌─────────────────────────────────┐
│   🔒 BI Dashboard Portal        │
│                                 │
│   Enter OTP                     │
│   ┌─────────────────────────┐   │
│   │ 123456                  │   │
│   └─────────────────────────┘   │
│   OTP sent to +1234567890       │
│                                 │
│   [Verify OTP] [Change Number]  │
└─────────────────────────────────┘
```

**Enter:** 6-digit code from SMS

#### **Step 4: Access Dashboard**
- ✅ Login successful!
- ✅ Dashboard appears
- ✅ See reports based on your role

---

## 🔧 Before First Login - Setup Required

### ⚠️ Firebase Configuration (MUST DO)

**Without Firebase, login won't work!**

1. **Go to:** https://console.firebase.google.com/
2. **Create Project** → Enter name → Continue
3. **Enable Phone Auth:**
   - Click **Authentication** (left menu)
   - Click **Sign-in method** tab
   - Click **Phone** → **Enable** → **Save**
4. **Get Config:**
   - Click **⚙️ Project Settings**
   - Scroll to **"Your apps"**
   - Click **Web** icon `</>`
   - Copy the config values
5. **Update File:** `src/firebase/config.js`
   - Replace `YOUR_API_KEY`, `YOUR_AUTH_DOMAIN`, etc.

### 👤 Add Your Phone Number

**Edit:** `src/config/users.json`

```json
{
  "users": {
    "+YOUR_PHONE_NUMBER": {
      "phone": "+YOUR_PHONE_NUMBER",
      "role": "team-head",  // or "sales"
      "name": "Your Name",
      "email": "your@email.com"
    }
  }
}
```

**Example:**
- India: `+919876543210`
- US: `+1234567890`
- UK: `+441234567890`

---

## 🎮 Testing the Login

### Test User 1: Team Head
- **Phone:** `+1234567890` (from default config)
- **Sees:** ALL reports
- **Can:** Manage reports (add/remove)

### Test User 2: Sales
- **Phone:** `+1987654321` (from default config)
- **Sees:** Only Sales reports
- **Cannot:** Manage reports

**Note:** These are example numbers. Replace with real numbers for actual OTP.

---

## 🚨 Common Issues & Solutions

### ❌ "Failed to send OTP"
- **Fix:** Check Firebase config is correct
- **Fix:** Ensure Phone Auth is enabled in Firebase

### ❌ "Invalid OTP"
- **Fix:** Enter the correct 6-digit code
- **Fix:** Check SMS was received

### ❌ Website won't start
- **Fix:** Run `npm install` first
- **Fix:** Check if port 3000 is available

### ❌ Can't see reports after login
- **Fix:** Check your role in `users.json`
- **Fix:** Team Head sees all, Sales sees only Sales reports

---

## 📱 Login Flow Diagram

```
Start
  ↓
Enter Phone Number
  ↓
Click "Send OTP"
  ↓
Receive SMS (6-digit code)
  ↓
Enter OTP Code
  ↓
Click "Verify OTP"
  ↓
✅ Login Success!
  ↓
See Dashboard (based on role)
```

---

## 🎯 What You'll See After Login

### Team Head View:
- ✅ All reports visible
- ✅ Settings icon (top right) to manage reports
- ✅ Can add/remove reports

### Sales View:
- ✅ Only Sales reports visible
- ✅ No settings icon
- ✅ Cannot manage reports

---

## 💡 Pro Tips

1. **Keep terminal open** - Server runs in terminal
2. **Check browser console** (F12) for errors
3. **Use real phone numbers** for OTP testing
4. **Export config** - Use "Export Config" to backup reports

---

## 🆘 Need Help?

1. Check `SETUP_GUIDE.md` for detailed setup
2. Check browser console (F12) for errors
3. Verify Firebase configuration
4. Ensure phone number is in `users.json`

---

**Ready?** Run `npm run dev` and start testing! 🚀
