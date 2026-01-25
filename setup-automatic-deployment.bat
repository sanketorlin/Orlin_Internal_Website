@echo off
title Setup Automatic Deployment - Step by Step
color 0B
echo.
echo ========================================
echo   AUTOMATIC DEPLOYMENT SETUP
echo ========================================
echo.
echo This will guide you through setting up automatic deployments.
echo.
echo Time needed: 15-20 minutes
echo.
pause

cd /d "%~dp0"

echo.
echo ========================================
echo   STEP 1: Check Prerequisites
echo ========================================
echo.

echo [1.1] Checking Git installation...
where git >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ❌ Git is NOT installed!
    echo.
    echo Please install Git first:
    echo   1. Go to: https://git-scm.com/download/win
    echo   2. Download and install
    echo   3. Restart this script
    echo.
    echo Opening Git download page...
    start https://git-scm.com/download/win
    echo.
    pause
    exit /b 1
)
echo ✅ Git is installed!
for /f "tokens=*" %%i in ('git --version') do echo    Version: %%i
echo.

echo [1.2] Checking if Git is configured...
git config --global user.name >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ⚠️  Git user name/email not set.
    echo.
    echo Please set your Git identity:
    echo.
    set /p GIT_NAME="Enter your name: "
    set /p GIT_EMAIL="Enter your email: "
    git config --global user.name "%GIT_NAME%"
    git config --global user.email "%GIT_EMAIL%"
    echo ✅ Git configured!
) else (
    echo ✅ Git is configured!
    for /f "tokens=*" %%i in ('git config --global user.name') do echo    Name: %%i
    for /f "tokens=*" %%i in ('git config --global user.email') do echo    Email: %%i
)
echo.

echo [1.3] Checking if repository is initialized...
if exist ".git" (
    echo ✅ Git repository already initialized!
) else (
    echo Initializing Git repository...
    call git init
    echo ✅ Git repository initialized!
)
echo.

echo ========================================
echo   STEP 2: Instructions
echo ========================================
echo.
echo ✅ Prerequisites checked!
echo.
echo ========================================
echo   NEXT STEPS:
echo ========================================
echo.
echo 1. CREATE GITHUB ACCOUNT (if needed)
echo    → Go to: https://github.com
echo    → Sign up (FREE)
echo    → Verify email
echo.
echo 2. CREATE REPOSITORY ON GITHUB
echo    → Click "+" → "New repository"
echo    → Name: bi-dashboard-portal
echo    → Make it Private
echo    → DON'T check "Add README"
echo    → Create repository
echo    → Copy the repository URL
echo.
echo 3. UPLOAD CODE TO GITHUB
echo    → Run these commands in PowerShell:
echo.
echo      git add .
echo      git commit -m "Initial commit"
echo      git branch -M main
echo      git remote add origin YOUR_GITHUB_URL
echo      git push -u origin main
echo.
echo 4. CONNECT TO VERCEL
echo    → Go to: https://vercel.com/dashboard
echo    → Add New Project
echo    → Import from GitHub
echo    → Select your repository
echo    → Deploy
echo.
echo 5. TEST AUTOMATIC DEPLOYMENT
echo    → Make a small change
echo    → Run: git add . && git commit -m "Test" && git push
echo    → Check Vercel - it deploys automatically!
echo.
echo ========================================
echo.
echo Opening detailed guide...
start 📚_AUTOMATIC_DEPLOYMENT_COMPLETE_GUIDE.md
echo.
echo See the guide for complete step-by-step instructions!
echo.
pause

