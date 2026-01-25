@echo off
title BI Dashboard Portal - Startup
color 0A
echo.
echo ========================================
echo   BI Dashboard Portal - Starting...
echo ========================================
echo.

cd /d "%~dp0"

echo [1/3] Checking Node.js installation...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ========================================
    echo   ERROR: Node.js is NOT installed!
    echo ========================================
    echo.
    echo Node.js is required to run this website.
    echo.
    echo I'm opening the download page for you...
    echo Please download and install Node.js LTS version.
    echo.
    start https://nodejs.org/
    echo.
    echo After installing Node.js:
    echo 1. RESTART your computer
    echo 2. Run this script again
    echo.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo Node.js found! Version: %NODE_VERSION%
echo.

echo [2/3] Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies (this may take a few minutes)...
    call npm install
    if %errorlevel% neq 0 (
        echo.
        echo ERROR: Failed to install dependencies!
        echo Please check your internet connection.
        echo.
        pause
        exit /b 1
    )
    echo Dependencies installed successfully!
) else (
    echo Dependencies already installed.
)
echo.

echo [3/3] Starting development server...
echo.
echo ========================================
echo   Server Starting...
echo ========================================
echo.
echo Local Access:
echo   http://localhost:3000
echo.
echo Network Access (Share with others on same WiFi):
echo   Check the server window for your IP address
echo   Format: http://YOUR_IP:3000
echo.
echo Login Credentials:
echo   Team Head: john@example.com / password123
echo   Sales User: jane@example.com / password123
echo.
echo Press Ctrl+C to stop the server
echo.
echo ========================================
echo.

call npm run dev

pause

