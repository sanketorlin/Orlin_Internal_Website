# 📦 Install Node.js (Required First Step)

## ❌ Problem
You're seeing: `npm is not recognized`

This means **Node.js is not installed** on your computer.

---

## ✅ Solution: Install Node.js

### Option 1: Download from Official Website (Recommended)

1. **Go to:** https://nodejs.org/
2. **Download:** Click the **LTS version** (Long Term Support)
   - Example: "20.x.x LTS" button
   - This includes both Node.js and npm
3. **Run the installer:**
   - Double-click the downloaded `.msi` file
   - Click "Next" through the installation
   - ✅ **IMPORTANT:** Check "Automatically install necessary tools"
   - Click "Install"
4. **Restart your terminal/PowerShell:**
   - Close current PowerShell window
   - Open a new PowerShell window
5. **Verify installation:**
   ```powershell
   node --version
   npm --version
   ```
   You should see version numbers (e.g., `v20.10.0` and `10.2.3`)

---

### Option 2: Install via Chocolatey (If you have it)

```powershell
choco install nodejs
```

---

### Option 3: Install via Winget (Windows 11)

```powershell
winget install OpenJS.NodeJS.LTS
```

---

## 🔄 After Installation

1. **Close and reopen PowerShell** (important!)
2. **Navigate to your project:**
   ```powershell
   cd "C:\Users\ORLIN\OneDrive\Desktop\Work Flow Analysis Web"
   ```
3. **Verify Node.js is installed:**
   ```powershell
   node --version
   npm --version
   ```
4. **Install project dependencies:**
   ```powershell
   npm install
   ```
5. **Run the website:**
   ```powershell
   npm run dev
   ```

---

## ✅ Quick Check Commands

After installing Node.js, run these to verify:

```powershell
# Check Node.js version
node --version

# Check npm version  
npm --version

# Check if both are working
node -v && npm -v
```

**Expected output:**
```
v20.10.0
10.2.3
```

---

## 🚨 Still Not Working?

### If `npm` still not recognized after installation:

1. **Restart your computer** (sometimes needed)
2. **Check PATH environment variable:**
   - Search "Environment Variables" in Windows
   - Check if Node.js is in PATH
   - Usually: `C:\Program Files\nodejs\`
3. **Reinstall Node.js** with "Add to PATH" option checked

---

## 📝 Next Steps After Node.js Installation

Once Node.js is installed:

1. ✅ Run `npm install` in your project folder
2. ✅ Run `npm run dev` to start the website
3. ✅ Configure Firebase (see `SETUP_GUIDE.md`)
4. ✅ Add your phone number to `users.json`
5. ✅ Start using the website!

---

## 💡 Tip

**Always restart PowerShell/terminal after installing Node.js!**

The terminal needs to reload environment variables to recognize the new `npm` command.

---

**Need help?** Visit: https://nodejs.org/ for official documentation
