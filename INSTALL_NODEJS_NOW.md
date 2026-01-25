# 🚨 URGENT: Install Node.js First!

## ❌ Current Problem

You're seeing this error:
```
npm : The term 'npm' is not recognized
```

**This means Node.js is NOT installed on your computer.**

**You CANNOT run `npm install` or `npm run dev` until Node.js is installed!**

---

## ✅ SOLUTION: Install Node.js (5 Minutes)

### Step 1: Download Node.js

1. **Open your web browser**
2. **Go to:** https://nodejs.org/
3. **You'll see TWO buttons:**
   - **LTS** (Recommended) - Click this one! ✅
   - Current (Latest features)
4. **Click the green "LTS" button**
   - It will say something like "20.x.x LTS"
   - This downloads the Windows installer

### Step 2: Install Node.js

1. **Find the downloaded file** in your Downloads folder
   - File name: `node-v20.x.x-x64.msi` (or similar)
2. **Double-click the file** to run the installer
3. **Click "Next"** through the installation wizard
4. **IMPORTANT:** Make sure these are checked:
   - ✅ "Automatically install the necessary tools"
   - ✅ "Add to PATH" (should be checked by default)
5. **Click "Install"**
6. **Wait for installation** (takes 1-2 minutes)
7. **Click "Finish"** when done

### Step 3: Restart PowerShell ⚠️ CRITICAL!

**You MUST close and reopen PowerShell after installation!**

1. **Close your current PowerShell window** completely
2. **Open a NEW PowerShell window**
3. **Navigate back to your project:**
   ```powershell
   cd "C:\Users\ORLIN\OneDrive\Desktop\Work Flow Analysis Web"
   ```

### Step 4: Verify Installation

**In the NEW PowerShell window, run:**

```powershell
node --version
```

**Expected output:**
```
v20.10.0
```
(or similar version number)

**Then run:**
```powershell
npm --version
```

**Expected output:**
```
10.2.3
```
(or similar version number)

**✅ If you see version numbers, Node.js is installed correctly!**

---

## 🎯 After Node.js is Installed

### Then you can run:

```powershell
npm install
```

**Wait for it to finish** (takes 1-2 minutes)

**Then run:**

```powershell
npm run dev
```

**Website will open at:** http://localhost:3000

---

## 🚨 Still Not Working?

### If `npm` still not recognized after installation:

1. **Restart your computer** (sometimes needed)
2. **Check if Node.js is installed:**
   - Search Windows for "Node.js"
   - If you see "Node.js" in programs, it's installed
3. **Try Command Prompt instead of PowerShell:**
   - Open Command Prompt (cmd)
   - Try `node --version` there
4. **Reinstall Node.js:**
   - Uninstall from Control Panel
   - Download and install again
   - Make sure "Add to PATH" is checked

---

## 📋 Quick Checklist

- [ ] Downloaded Node.js from https://nodejs.org/
- [ ] Installed Node.js (ran the .msi file)
- [ ] Closed old PowerShell window
- [ ] Opened NEW PowerShell window
- [ ] Ran `node --version` → See version number ✅
- [ ] Ran `npm --version` → See version number ✅
- [ ] Now can run `npm install` ✅

---

## 💡 Visual Guide

```
1. Go to nodejs.org
   ↓
2. Click "LTS" button (green)
   ↓
3. Download starts automatically
   ↓
4. Run the downloaded .msi file
   ↓
5. Click "Next" → "Next" → "Install"
   ↓
6. Wait for installation
   ↓
7. Click "Finish"
   ↓
8. CLOSE PowerShell
   ↓
9. OPEN NEW PowerShell
   ↓
10. Run: node --version
    ✅ Should show version number
```

---

## 🆘 Need Help?

**If you're stuck:**
1. Check `INSTALL_NODEJS.md` for more details
2. Visit https://nodejs.org/ for official help
3. Make sure you downloaded the LTS version
4. Remember to restart PowerShell after installation!

---

**⚠️ IMPORTANT:** You cannot proceed with `npm install` until Node.js is installed!

**Next Step:** Go to https://nodejs.org/ and download Node.js NOW! 🚀
