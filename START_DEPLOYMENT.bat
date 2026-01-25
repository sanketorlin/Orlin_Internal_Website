@echo off
title Deploy to Vercel - Step by Step
color 0B
echo.
echo ========================================
echo   DEPLOY TO VERCEL - STEP BY STEP
echo ========================================
echo.
echo This will guide you through deployment.
echo.
echo IMPORTANT: Keep this window open!
echo.
pause

cd /d "%~dp0"

echo.
echo ========================================
echo   STEP 1: Checking Requirements
echo ========================================
echo.

echo Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Node.js is not installed!
    echo Please install Node.js first.
    pause
    exit /b 1
)
echo ✅ Node.js found!
echo.

echo Checking Vercel CLI...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    echo This may take 1-2 minutes...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install Vercel CLI
        echo Please check your internet connection.
        pause
        exit /b 1
    )
    echo ✅ Vercel CLI installed!
) else (
    echo ✅ Vercel CLI found!
)
echo.

echo ========================================
echo   STEP 2: Building Project
echo ========================================
echo.
echo Building your website...
echo This may take 30-60 seconds...
echo.

call npm run build
if %errorlevel% neq 0 (
    echo.
    echo ERROR: Build failed!
    echo Please check the errors above.
    pause
    exit /b 1
)
echo.
echo ✅ Build successful!
echo.

echo ========================================
echo   STEP 3: Deploying to Vercel
echo ========================================
echo.
echo INSTRUCTIONS:
echo.
echo 1. Browser will open for login
echo    → Sign up/Login to Vercel (FREE)
echo    → Use GitHub (easiest) or email
echo.
echo 2. Return to this window
echo.
echo 3. Answer the questions:
echo    → "Set up and deploy?" → Type: Y
echo    → "Link to existing?" → Type: N (first time)
echo    → "Project name?" → Press Enter
echo    → "Directory?" → Press Enter
echo    → "Override settings?" → Type: N
echo.
echo 4. Wait 1-2 minutes for deployment
echo.
echo 5. Copy the URL you get (like https://your-project.vercel.app)
echo.
echo ========================================
echo.
echo Press any key to start deployment...
pause
echo.

call vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   ✅ DEPLOYMENT SUCCESSFUL!
    echo ========================================
    echo.
    echo Your website is now live!
    echo.
    echo Look above for your URL:
    echo → https://your-project-name.vercel.app
    echo.
    echo Share this URL with anyone, anywhere!
    echo.
    echo ========================================
) else (
    echo.
    echo ========================================
    echo   ❌ DEPLOYMENT FAILED
    echo ========================================
    echo.
    echo Please check the errors above.
    echo Try again or check the guide: 📘_VERCEL_DEPLOYMENT_GUIDE.md
    echo.
)

echo.
pause

