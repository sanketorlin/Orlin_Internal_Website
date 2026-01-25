# 🚀 START HERE - How to Run & Login

## ⚠️ IMPORTANT: Install Node.js First!

**If you see `npm is not recognized`:**
- You need to install Node.js first!
- **Download:** https://nodejs.org/ (get LTS version)
- **See:** `INSTALL_NODEJS.md` for detailed steps
- **After installing:** Restart PowerShell, then continue below

---

## ⚡ Quick Commands

### 1. Install (First Time Only)
```bash
npm install
```

**Note:** This requires Node.js to be installed first!

### 2. Run Website
```bash
npm run dev
```

**Website opens at:** http://localhost:3000

---

## 📱 Login Steps

### What You'll See:

**1. Login Page** (First Screen)
```
┌──────────────────────────────┐
│  🔒 BI Dashboard Portal      │
│  Secure OTP Login            │
│                              │
│  📱 Phone Number             │
│  [Enter: +1234567890]       │
│                              │
│  [Send OTP]                  │
└──────────────────────────────┘
```

**2. OTP Entry** (After clicking Send OTP)
```
┌──────────────────────────────┐
│  🔒 BI Dashboard Portal      │
│                              │
│  Enter OTP                   │
│  [Enter: 123456]            │
│  OTP sent to +1234567890    │
│                              │
│  [Verify OTP] [Change #]    │
└──────────────────────────────┘
```

**3. Dashboard** (After successful login)
- See your reports
- Click "View Dashboard" to open reports

---

## ⚙️ Setup Required (Before Login Works)

### 🔥 Firebase Setup (REQUIRED)

1. Go to: https://console.firebase.google.com/
2. Create project → Enable Phone Authentication
3. Get config → Update `src/firebase/config.js`

**See:** `SETUP_GUIDE.md` for detailed steps

### 👤 Add Your Phone

Edit: `src/config/users.json`

Add your phone number with role:
```json
"+1234567890": {
  "role": "team-head",  // or "sales"
  "name": "Your Name"
}
```

---

## 🎯 Test Users (Default)

Already configured in `users.json`:

| Phone | Role | Sees |
|-------|------|------|
| +1234567890 | team-head | ALL reports |
| +1987654321 | sales | Only Sales reports |

**Note:** Replace with real numbers for actual OTP!

---

## 📖 More Help

- **Detailed Setup:** See `SETUP_GUIDE.md`
- **Visual Guide:** See `QUICK_START.md`
- **Full Docs:** See `README.md`

---

## ✅ Ready to Start?

```bash
npm install
npm run dev
```

Then open: http://localhost:3000

---

**Need help?** Check the browser console (F12) for errors!
