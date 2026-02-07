@echo off
title Update Netlify Site
color 0B
echo.
echo ========================================
echo   Update Netlify Site
echo ========================================
echo.
echo This will update your deployed website with latest changes.
echo.

cd /d "%~dp0"

echo Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)

echo.
echo Deploying update...
call netlify deploy --prod

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo   UPDATE SUCCESSFUL!
    echo ========================================
    echo.
    echo Your website has been updated!
    echo Changes are live now.
    echo.
) else (
    echo.
    echo Update failed. Please check the errors above.
    echo.
)

pause



