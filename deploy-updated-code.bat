@echo off
echo ========================================
echo   Deploy Updated Code to Vercel
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH
    echo Please install Node.js first
    pause
    exit /b 1
)

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] npm is not installed or not in PATH
    pause
    exit /b 1
)

echo [1/4] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Building project...
call npm run build
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Build failed
    pause
    exit /b 1
)

echo.
echo [3/4] Checking for Git...
git --version >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    echo Git is available!
    echo.
    echo [4/4] Deploying via Git...
    echo.
    echo Choose deployment method:
    echo 1. Push to Git (if connected to Vercel)
    echo 2. Deploy via Vercel CLI
    echo.
    set /p choice="Enter choice (1 or 2): "
    
    if "%choice%"=="1" (
        echo.
        echo Committing changes...
        git add .
        git commit -m "Fix: Real-time sync for all users"
        echo.
        echo Pushing to Git...
        git push
        echo.
        echo ✅ Code pushed! Vercel will auto-deploy.
        echo Check your Vercel dashboard for deployment status.
    ) else if "%choice%"=="2" (
        echo.
        echo Checking for Vercel CLI...
        where vercel >nul 2>&1
        if %ERRORLEVEL% NEQ 0 (
            echo Installing Vercel CLI...
            call npm install -g vercel
        )
        echo.
        echo Deploying to Vercel...
        call vercel --prod
    ) else (
        echo Invalid choice. Exiting.
        pause
        exit /b 1
    )
) else (
    echo Git is not available.
    echo.
    echo [4/4] Deploying via Vercel CLI...
    where vercel >nul 2>&1
    if %ERRORLEVEL% NEQ 0 (
        echo Installing Vercel CLI...
        call npm install -g vercel
    )
    echo.
    echo Deploying to Vercel...
    call vercel --prod
)

echo.
echo ========================================
echo   Deployment Complete!
echo ========================================
echo.
echo Your updated code is now live!
echo All users will get the sync fix automatically.
echo.
pause

