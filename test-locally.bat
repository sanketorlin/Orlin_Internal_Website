@echo off
echo ========================================
echo   Test Changes Locally Before Push
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed
    echo Please install Node.js first
    pause
    exit /b 1
)

echo [1/4] Installing dependencies (if needed)...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [2/4] Starting development server...
echo.
echo ========================================
echo   Server starting at http://localhost:3000
echo ========================================
echo.
echo Testing Checklist:
echo   [ ] Login as Super Admin
echo   [ ] Add new user with password
echo   [ ] Test password reset email
echo   [ ] Login with new user
echo   [ ] Check browser console (F12) for errors
echo.
echo Press Ctrl+C to stop the server when done testing
echo.
echo ========================================
echo.

call npm run dev

pause

