# 📝 Step-by-Step: Get Your Website Running

## Current Status: ❌ Blocked - Node.js Not Installed

---

## 🎯 What You Need to Do (In Order)

### ✅ STEP 1: Install Node.js (DO THIS FIRST!)

**You cannot skip this step!**

1. **Open browser** → Go to: **https://nodejs.org/**
2. **Click the green "LTS" button** (left side)
3. **Wait for download** (file: `node-v20.x.x-x64.msi`)
4. **Run the downloaded file**
5. **Click "Next" → "Next" → "Install"**
6. **Wait 1-2 minutes**
7. **Click "Finish"**

**⏸️ STOP HERE - Close PowerShell and open a new one!**

---

### ✅ STEP 2: Verify Node.js

**In NEW PowerShell window:**

```powershell
cd "C:\Users\ORLIN\OneDrive\Desktop\Work Flow Analysis Web"
node --version
```

**✅ Should show:** `v20.10.0` (or similar)

```powershell
npm --version
```

**✅ Should show:** `10.2.3` (or similar)

**If you see version numbers → Node.js is installed! ✅**

**If you see errors → Go back to Step 1**

---

### ✅ STEP 3: Install Project Dependencies

**Only after Step 2 works!**

```powershell
npm install
```

**Wait for it to finish** (1-2 minutes)
**You'll see:** `added XXX packages`

---

### ✅ STEP 4: Run the Website

```powershell
npm run dev
```

**Website opens at:** http://localhost:3000

**✅ SUCCESS!** You should see the login page!

---

## 🚨 Common Mistakes

### ❌ Mistake 1: Running npm before installing Node.js
**Error:** `npm is not recognized`
**Fix:** Install Node.js first (Step 1)

### ❌ Mistake 2: Not restarting PowerShell
**Error:** `npm is not recognized` (even after installing)
**Fix:** Close PowerShell, open new one

### ❌ Mistake 3: Using old PowerShell window
**Error:** Commands don't work
**Fix:** Always use a NEW PowerShell after installing Node.js

---

## 📊 Progress Tracker

Check off each step as you complete it:

- [ ] **Step 1:** Downloaded Node.js from nodejs.org
- [ ] **Step 1:** Installed Node.js (.msi file)
- [ ] **Step 1:** Closed old PowerShell
- [ ] **Step 1:** Opened NEW PowerShell
- [ ] **Step 2:** `node --version` works ✅
- [ ] **Step 2:** `npm --version` works ✅
- [ ] **Step 3:** `npm install` completed ✅
- [ ] **Step 4:** `npm run dev` works ✅
- [ ] **Step 4:** Website opens in browser ✅

---

## 🎯 Your Current Status

**You are here:** ⬅️ **STEP 1** (Install Node.js)

**Cannot proceed to Step 2 until Step 1 is complete!**

---

## 💬 Quick Reference

**Current Error:**
```
npm is not recognized
```

**Solution:**
1. Install Node.js from https://nodejs.org/
2. Restart PowerShell
3. Then try `npm install` again

---

**Next Action:** Go to https://nodejs.org/ and download Node.js! 🚀
