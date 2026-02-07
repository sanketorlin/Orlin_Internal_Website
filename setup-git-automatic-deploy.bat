@echo off
title Setup Git for Automatic Deployments
color 0E
echo.
echo ========================================
echo   Setup Git for Automatic Deployments
echo ========================================
echo.
echo This will help you set up automatic deployments.
echo.
echo You'll need:
echo   1. GitHub account (free)
echo   2. Git installed (we'll check)
echo.
pause

cd /d "%~dp0"

echo.
echo [1/3] Checking if Git is installed...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo Git is NOT installed!
    echo.
    echo Please install Git first:
    echo   1. Go to: https://git-scm.com/download/win
    echo   2. Download and install
    echo   3. Restart this script
    echo.
    echo Opening Git download page...
    start https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git is installed!
echo.

echo [2/3] Checking if Git is initialized...
if exist ".git" (
    echo ✅ Git repository already exists!
) else (
    echo Initializing Git repository...
    call git init
    echo ✅ Git repository initialized!
)
echo.

echo [3/3] Instructions...
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. Create GitHub account (if needed):
echo    → Go to: https://github.com
echo    → Sign up (FREE)
echo.
echo 2. Create a new repository on GitHub:
echo    → Click "+" → "New repository"
echo    → Name it (e.g., "bi-dashboard")
echo    → Make it Private
echo    → Don't initialize with README
echo    → Create repository
echo.
echo 3. Connect your local code to GitHub:
echo    → Copy the repository URL from GitHub
echo    → Run these commands in PowerShell:
echo.
echo    git add .
echo    git commit -m "Initial commit"
echo    git branch -M main
echo    git remote add origin YOUR_GITHUB_URL
echo    git push -u origin main
echo.
echo 4. Connect GitHub to Vercel:
echo    → Go to: https://vercel.com/dashboard
echo    → Add New Project
echo    → Import from GitHub
echo    → Select your repository
echo    → Deploy
echo.
echo 5. Done! Now every git push = automatic deployment!
echo.
echo ========================================
echo.
echo See 🔄_UPDATE_DEPLOYMENT_GUIDE.md for detailed guide.
echo.
pause



