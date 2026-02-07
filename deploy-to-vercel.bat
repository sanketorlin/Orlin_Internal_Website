@echo off
title Deploy to Vercel
color 0A
echo.
echo ========================================
echo   Deploy Website to Vercel (Online)
echo ========================================
echo.
echo This will make your website accessible from ANYWHERE!
echo.

cd /d "%~dp0"

echo [1/4] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please install Node.js first.
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/4] Checking if Vercel CLI is installed...
where vercel >nul 2>&1
if %errorlevel% neq 0 (
    echo Vercel CLI not found. Installing...
    call npm install -g vercel
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Vercel CLI
        pause
        exit /b 1
    )
    echo Vercel CLI installed!
) else (
    echo Vercel CLI found!
)
echo.

echo [3/4] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Build successful!
echo.

echo [4/4] Deploying to Vercel...
echo.
echo You will be asked to:
echo   1. Login to Vercel (opens browser)
echo   2. Confirm deployment settings
echo.
pause

call vercel --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   DEPLOYMENT SUCCESSFUL!
    echo ========================================
    echo.
    echo Your website is now online!
    echo Check the URL above and share it with anyone!
    echo.
) else (
    echo.
    echo Deployment failed. Please try again.
    echo.
)

pause



