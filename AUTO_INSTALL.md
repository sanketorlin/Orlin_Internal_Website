# 🤖 Automatic Node.js Installation

I've created a PowerShell script to install Node.js automatically for you!

## Option 1: Run the Script (Easiest)

1. **Open PowerShell as Administrator:**
   - Right-click on PowerShell
   - Select "Run as Administrator"

2. **Navigate to your project:**
   ```powershell
   cd "C:\Users\ORLIN\OneDrive\Desktop\Work Flow Analysis Web"
   ```

3. **Run the installation script:**
   ```powershell
   .\install-nodejs.ps1
   ```

4. **If you get an execution policy error, run:**
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   Then run the script again.

---

## Option 2: Manual Installation (If script doesn't work)

1. **Go to:** https://nodejs.org/
2. **Download LTS version**
3. **Run the installer**
4. **Restart PowerShell**

---

## Option 3: Use winget Command Directly

If you're comfortable with commands, you can run:

```powershell
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
```

**Note:** You may need to run PowerShell as Administrator.

---

## After Installation

1. **Close and reopen PowerShell** (important!)
2. **Verify installation:**
   ```powershell
   node --version
   npm --version
   ```
3. **Install project dependencies:**
   ```powershell
   npm install
   ```
4. **Run the website:**
   ```powershell
   npm run dev
   ```

---

**Which option would you like to try?**
