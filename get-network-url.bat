@echo off
echo.
echo ========================================
echo   Your Network URL for Sharing
echo ========================================
echo.

for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do (
    set ip=%%a
    set ip=!ip:~1!
    echo Your IP Address: !ip!
    echo.
    echo Share this URL with others on your network:
    echo   http://!ip!:3000
    echo.
    echo Note: Others must be on the same WiFi network
    echo.
    goto :found
)

:found
echo Press any key to exit...
pause >nul



