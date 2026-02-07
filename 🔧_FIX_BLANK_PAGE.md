# Fix Blank Page on Vercel - Step by Step

## Problem
After deploying to Vercel, the website shows a blank page.

## ✅ Fix Applied

I've updated the `vercel.json` configuration to the correct format for Vite.

## 🔧 What I Fixed

1. **Updated vercel.json** - Changed to correct Vite configuration
2. **Updated vite.config.js** - Added proper build settings

## 📋 Next Steps to Fix

### Option 1: Redeploy with Fixed Config (Easiest)

1. **The config files are already fixed!**

2. **Redeploy to Vercel:**
   - Go to: https://vercel.com/dashboard
   - Click on your project
   - Go to "Settings" → "General"
   - Scroll to "Build & Development Settings"
   - Make sure:
     - Framework Preset: **Vite**
     - Build Command: `npm run build`
     - Output Directory: `dist`
     - Install Command: `npm install`
   - Click "Save"

3. **Redeploy:**
   - Go to "Deployments" tab
   - Click "..." on latest deployment
   - Click "Redeploy"
   - Or push new code to trigger redeploy

### Option 2: Deploy Again with CLI

1. **Run deployment script again:**
   ```bash
   deploy-to-vercel.bat
   ```

2. **When asked "Link to existing project?"**
   - Type: **Y** (Yes)
   - Select your existing project
   - Continue

3. **Wait for deployment**

### Option 3: Check Browser Console

1. **Open your Vercel URL**
2. **Press F12** (open Developer Tools)
3. **Go to "Console" tab**
4. **Look for errors** (red messages)
5. **Share the errors** - I can help fix them

## 🔍 Common Issues & Fixes

### Issue 1: Assets Not Loading
**Symptom:** Blank page, console shows 404 errors for JS/CSS files

**Fix:**
- Check `vercel.json` has correct `outputDirectory: "dist"`
- Make sure build completed successfully
- Check base path in `vite.config.js` is `/`

### Issue 2: Firebase Config Error
**Symptom:** Blank page, console shows Firebase errors

**Fix:**
- Make sure Firebase config is correct in `src/firebase/config.js`
- Check Firebase project is set up correctly
- Verify Email/Password auth is enabled

### Issue 3: Build Failed
**Symptom:** Deployment shows "Build Failed"

**Fix:**
- Check Vercel deployment logs
- Make sure all dependencies are in `package.json`
- Try building locally: `npm run build`

### Issue 4: Routing Issue
**Symptom:** Page loads but shows 404 on refresh

**Fix:**
- `vercel.json` should have rewrite rules (already fixed)
- Make sure all routes point to `/index.html`

## ✅ Files Updated

1. **vercel.json** - Updated to correct Vite format
2. **vite.config.js** - Added build configuration

## 🚀 Quick Fix Steps

1. ✅ Config files are fixed
2. ➡️  Redeploy to Vercel (use Option 1 or 2 above)
3. ➡️  Check browser console for errors (F12)
4. ➡️  Test the website

## 📝 If Still Not Working

1. **Check Vercel deployment logs:**
   - Go to Vercel dashboard
   - Click on your project
   - Click on latest deployment
   - Check "Build Logs" for errors

2. **Check browser console:**
   - Open website
   - Press F12
   - Go to Console tab
   - Look for red error messages
   - Share the errors with me

3. **Verify build works locally:**
   ```bash
   npm run build
   npm run preview
   ```
   - If this works, the issue is Vercel config
   - If this fails, there's a code issue

## 🎯 Most Likely Fix

The `vercel.json` was using old format. I've updated it. Just **redeploy** and it should work!



