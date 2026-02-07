@echo off
echo.
echo ========================================
echo   Checking Node.js Installation...
echo ========================================
echo.

where node >nul 2>&1
if %errorlevel% equ 0 (
    echo [SUCCESS] Node.js IS installed!
    echo.
    for /f "tokens=*" %%i in ('node --version') do echo Node.js Version: %%i
    for /f "tokens=*" %%i in ('npm --version') do echo npm Version: %%i
    echo.
    echo You can now run: start-website.bat
    echo.
) else (
    echo [ERROR] Node.js is NOT installed!
    echo.
    echo Please install Node.js first:
    echo 1. Go to: https://nodejs.org/
    echo 2. Download the LTS version (green button)
    echo 3. Install it
    echo 4. RESTART your computer
    echo 5. Run this check again
    echo.
    echo Opening Node.js website...
    start https://nodejs.org/
)

echo.
pause



