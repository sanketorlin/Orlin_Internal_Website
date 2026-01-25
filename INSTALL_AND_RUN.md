# How to Fix "ERR_CONNECTION_REFUSED" Error

## The Problem
The error "ERR_CONNECTION_REFUSED" means the development server is not running. This happens because **Node.js is not installed** on your computer.

## Solution: Install Node.js

### Step 1: Download Node.js
1. Go to: **https://nodejs.org/**
2. Click the **"LTS"** (Long Term Support) version button (recommended)
3. This will download the installer (e.g., `node-v20.x.x-x64.msi`)

### Step 2: Install Node.js
1. Run the downloaded installer
2. Click "Next" through the installation wizard
3. **Important**: Make sure "Add to PATH" is checked (it should be by default)
4. Click "Install"
5. Wait for installation to complete
6. Click "Finish"

### Step 3: Restart Your Computer (Recommended)
- Close all terminal/PowerShell windows
- Restart your computer to ensure PATH is updated

### Step 4: Start the Website
After restarting, you have two options:

#### Option A: Use the Batch File (Easiest)
1. Double-click `start-website.bat` in the project folder
2. Wait for it to start
3. The website will open automatically at `http://localhost:3000`

#### Option B: Use PowerShell/Command Prompt
1. Right-click in the project folder
2. Select "Open in Terminal" or "Open PowerShell here"
3. Type: `npm run dev`
4. Press Enter
5. Open `http://localhost:3000` in your browser

---

## Verify Node.js Installation

After installing, verify it works:
1. Open PowerShell or Command Prompt
2. Type: `node --version`
3. You should see something like: `v20.x.x`
4. Type: `npm --version`
5. You should see something like: `10.x.x`

If you see version numbers, Node.js is installed correctly!

---

## Quick Summary

1. ✅ Install Node.js from https://nodejs.org/ (LTS version)
2. ✅ Restart your computer
3. ✅ Double-click `start-website.bat` OR run `npm run dev`
4. ✅ Open http://localhost:3000 in your browser
5. ✅ Login with:
   - Email: `john@example.com`
   - Password: `password123`

---

## Still Having Issues?

If you still get errors after installing Node.js:
1. Make sure you restarted your computer
2. Try opening a NEW PowerShell/Command Prompt window
3. Navigate to the project folder: `cd "C:\Users\sanke\OneDrive\Desktop\Work Flow Analysis Web"`
4. Run: `npm install` (to install dependencies)
5. Run: `npm run dev` (to start the server)

