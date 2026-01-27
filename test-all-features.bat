@echo off
echo ========================================
echo   Test All Features Locally
echo ========================================
echo.

echo Starting development server...
echo.
echo ========================================
echo   TESTING CHECKLIST
echo ========================================
echo.
echo SUPER ADMIN TESTS:
echo   [ ] Login as Super Admin
echo   [ ] See dashboard grouped by category
echo   [ ] Add multiple Sales dashboards
echo   [ ] Add user with password
echo   [ ] Send password reset email
echo.
echo REGULAR USER TESTS:
echo   [ ] Login as Sales user
echo   [ ] See only Sales dashboards
echo   [ ] Cannot see Settings icon
echo   [ ] See message about Super Admin only
echo.
echo CONSOLE CHECKS:
echo   [ ] Open F12 - Check for errors
echo   [ ] Look for success messages
echo.
echo ========================================
echo   Server starting at http://localhost:3000
echo ========================================
echo.
echo Press Ctrl+C to stop when done testing
echo.

call npm run dev

pause

