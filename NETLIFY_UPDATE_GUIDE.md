# How to Update Your Netlify Site After Changes

## Method 1: Using Netlify CLI (Recommended - Easy Updates)

### First Time Setup:
1. Run: `deploy-to-netlify-cli.bat`
2. Login to Netlify when prompted
3. Follow the setup steps
4. Your site will be deployed

### For Updates (After Making Changes):
**Just run: `update-netlify.bat`**

That's it! No drag & drop needed. The script will:
- Build your project
- Deploy the update automatically
- Your site will be updated in seconds

---

## Method 2: Drag & Drop (Simple but Manual)

Every time you make changes:
1. Run: `npm run build`
2. Go to: https://app.netlify.com/drop
3. Drag the `dist` folder again
4. Wait for deployment

**Note:** This works but is slower. Use Method 1 for easier updates.

---

## Method 3: Git Integration (Automatic - Best for Teams)

### Setup Git Integration (One Time):
1. Push your code to GitHub/GitLab/Bitbucket
2. Go to Netlify dashboard
3. Click "Add new site" → "Import an existing project"
4. Connect your Git repository
5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### After Setup:
- **Every time you push to Git, Netlify automatically deploys!**
- No manual steps needed
- Perfect for teams

---

## Quick Comparison

| Method | First Time | Updates | Best For |
|--------|-----------|---------|----------|
| **CLI** | Run script | Run script | Quick updates |
| **Drag & Drop** | Drag folder | Drag folder again | One-time deploy |
| **Git Integration** | Connect repo | Auto-deploy on push | Teams, automation |

---

## Recommended Workflow

1. **First deployment:** Use `deploy-to-netlify-cli.bat`
2. **For updates:** Use `update-netlify.bat` (just double-click!)
3. **For automation:** Set up Git integration

---

## Troubleshooting

**Problem: "netlify: command not found"**
- Solution: Run `deploy-to-netlify-cli.bat` first (it installs CLI)

**Problem: "Not logged in"**
- Solution: Run `netlify login` in terminal

**Problem: Changes not showing**
- Solution: Clear browser cache (Ctrl+Shift+R) or wait 1-2 minutes

---

## Summary

✅ **Easiest for updates:** Use `update-netlify.bat` after making changes
✅ **No drag & drop needed** with CLI method
✅ **Takes 30 seconds** to update your site
✅ **Git integration** for automatic deployments

