@echo off
echo ========================================
echo   Review Changes Before Pushing
echo ========================================
echo.

echo [1/3] Checking what files changed...
echo.
git status
echo.

echo [2/3] Summary of changes (lines added/removed)...
echo.
git diff --stat
echo.

echo [3/3] Do you want to see detailed changes?
echo.
set /p choice="View detailed changes? (y/n): "

if /i "%choice%"=="y" (
    echo.
    echo Showing changes in UserManager.jsx...
    echo.
    git diff src/components/UserManager.jsx
    echo.
    echo.
    echo Showing changes in other files...
    echo.
    git diff
)

echo.
echo ========================================
echo   Review Complete!
echo ========================================
echo.
echo If everything looks good, you can now:
echo   1. git add .
echo   2. git commit -m "Your message"
echo   3. git push
echo.
pause

