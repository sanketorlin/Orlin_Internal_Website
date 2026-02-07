# Start the development server in a new window
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

Write-Host "Starting development server..." -ForegroundColor Green
Write-Host "The website will open at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start npm in a new PowerShell window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; npm run dev"

# Wait a moment for server to start
Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "Server is starting in a new window..." -ForegroundColor Green
Write-Host "Browser should open automatically." -ForegroundColor Green
Write-Host ""
Write-Host "If the browser doesn't open, go to: http://localhost:3000" -ForegroundColor Yellow



