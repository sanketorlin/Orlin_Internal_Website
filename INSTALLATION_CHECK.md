# ✅ Installation Checklist

## Step 1: Install Node.js ⚠️ REQUIRED

**Status:** ❌ Not Installed (You need to do this first!)

**Action:**
1. Download from: https://nodejs.org/
2. Install the LTS version
3. **Restart PowerShell** after installation
4. Verify with: `node --version` and `npm --version`

**See:** `INSTALL_NODEJS.md` for detailed instructions

---

## Step 2: Install Project Dependencies

**After Node.js is installed, run:**
```powershell
npm install
```

**Expected:** Packages will download (takes 1-2 minutes)

---

## Step 3: Configure Firebase

**Action:**
1. Go to: https://console.firebase.google.com/
2. Create project → Enable Phone Authentication
3. Update `src/firebase/config.js`

**See:** `SETUP_GUIDE.md` for details

---

## Step 4: Add Your Phone Number

**Action:**
- Edit `src/config/users.json`
- Add your phone number with role

---

## Step 5: Run the Website

**Command:**
```powershell
npm run dev
```

**Website opens at:** http://localhost:3000

---

## 🎯 Current Status

- ❌ Node.js: **NOT INSTALLED** ← Do this first!
- ⏳ Project Dependencies: Waiting for Node.js
- ⏳ Firebase: Not configured yet
- ⏳ Users: Default users exist

---

## 📋 Quick Command Reference

```powershell
# 1. Check if Node.js is installed
node --version

# 2. Install dependencies (after Node.js)
npm install

# 3. Run website
npm run dev

# 4. Stop website
Press Ctrl+C in terminal
```

---

**Next Action:** Install Node.js from https://nodejs.org/
