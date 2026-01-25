@echo off
title Deploy to Netlify (CLI - Easy Updates)
color 0B
echo.
echo ========================================
echo   Deploy to Netlify (CLI Method)
echo ========================================
echo.
echo This method allows easy updates - just run this script again!
echo.

cd /d "%~dp0"

echo [1/3] Checking Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    pause
    exit /b 1
)
echo Node.js found!
echo.

echo [2/3] Checking Netlify CLI...
where netlify >nul 2>&1
if %errorlevel% neq 0 (
    echo Netlify CLI not found. Installing...
    call npm install -g netlify-cli
    if %errorlevel% neq 0 (
        echo ERROR: Failed to install Netlify CLI
        pause
        exit /b 1
    )
    echo Netlify CLI installed!
) else (
    echo Netlify CLI found!
)
echo.

echo [3/3] Building and deploying...
echo.
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo ========================================
echo   Deploying to Netlify...
echo ========================================
echo.
echo If this is your first time:
echo   1. You'll be asked to login (opens browser)
echo   2. Authorize Netlify
echo   3. Choose "Create & configure a new site"
echo   4. Choose a site name (or press Enter for random)
echo.
echo For updates: Just confirm and it will update automatically!
echo.
pause

call netlify deploy --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   DEPLOYMENT SUCCESSFUL!
    echo ========================================
    echo.
    echo Your website has been updated!
    echo The URL is shown above.
    echo.
    echo To update again: Just run this script!
    echo.
) else (
    echo.
    echo Deployment failed. Please try again.
    echo.
)

pause

