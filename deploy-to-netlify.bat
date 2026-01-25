@echo off
title Deploy to Netlify (Drag & Drop Method)
color 0B
echo.
echo ========================================
echo   Deploy Website to Netlify (Drag & Drop)
echo ========================================
echo.
echo NOTE: For easier updates later, use: deploy-to-netlify-cli.bat
echo       (CLI method allows easy updates without drag & drop)
echo.
echo This method: Drag & drop (works but requires drag & drop for updates)
echo.
pause

cd /d "%~dp0"

echo [1/2] Building project...
call npm run build
if %errorlevel% neq 0 (
    echo ERROR: Build failed!
    pause
    exit /b 1
)
echo Build successful!
echo.

echo [2/2] Opening Netlify...
echo.
echo Instructions:
echo   1. Sign up/Login to Netlify (free)
echo   2. Drag and drop the "dist" folder onto Netlify
echo   3. Get your URL instantly!
echo.
echo IMPORTANT: For future updates, you'll need to drag & drop again.
echo            Or use deploy-to-netlify-cli.bat for easier updates!
echo.
echo Opening Netlify website...
start https://app.netlify.com/drop
echo.
echo The "dist" folder is ready in this directory.
echo Drag it to the Netlify page that just opened!
echo.
pause

