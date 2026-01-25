# How to Share This Website with Others

## Option 1: Share on Your Local Network (Same WiFi)

### Step 1: Start the Server
Run the website as usual:
- Double-click `start-website.bat`
- OR run `npm run dev`

### Step 2: Find Your IP Address
Your local IP address is: **192.168.1.9**

### Step 3: Share the URL
Tell others to open in their browser:
```
http://192.168.1.9:3000
```

**Important:**
- ✅ Both you and others must be on the **same WiFi network**
- ✅ Your laptop must be running the server
- ✅ Windows Firewall may ask for permission (click "Allow")

---

## Option 2: Allow Through Windows Firewall

If others can't access, you may need to allow the connection:

1. When you start the server, Windows may show a firewall popup
2. Click **"Allow access"** or **"Allow"**
3. If no popup appears:
   - Go to: Windows Settings → Firewall & network protection
   - Click "Allow an app through firewall"
   - Find "Node.js" and check both "Private" and "Public"
   - Click OK

---

## Option 3: Deploy Online (Access from Anywhere)

For people outside your network, you need to deploy online:

### Free Options:
1. **Vercel** (Recommended - Easiest)
   - Go to: https://vercel.com
   - Sign up with GitHub
   - Connect your project
   - Deploy automatically

2. **Netlify**
   - Go to: https://netlify.com
   - Drag and drop your `dist` folder after building

3. **GitHub Pages**
   - Push code to GitHub
   - Enable GitHub Pages

### Build for Production:
```bash
npm run build
```
This creates a `dist` folder you can deploy.

---

## Quick Reference

**Local Network Access:**
- Your IP: `192.168.1.9`
- URL: `http://192.168.1.9:3000`
- Works only on same WiFi

**Localhost (Only Your Laptop):**
- URL: `http://localhost:3000`
- Only you can access

**Online Deployment:**
- Build: `npm run build`
- Deploy to Vercel/Netlify
- Get a public URL (e.g., `https://your-site.vercel.app`)

---

## Troubleshooting

**Problem: Others can't connect**
- Check you're on the same WiFi
- Check Windows Firewall settings
- Make sure server is running
- Try restarting the server

**Problem: IP address changed**
- Run: `ipconfig` in Command Prompt
- Look for "IPv4 Address"
- Share the new IP address

