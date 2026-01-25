# Start server and show network URL
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Get local IP address
$ipAddress = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object {
    $_.IPAddress -like "192.168.*" -or $_.IPAddress -like "10.*" -or $_.IPAddress -like "172.*"
} | Select-Object -First 1).IPAddress

if (-not $ipAddress) {
    $ipAddress = "localhost"
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Development Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Local Access:" -ForegroundColor Yellow
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "Network Access (Share with others on same WiFi):" -ForegroundColor Yellow
Write-Host "  http://$ipAddress:3000" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Start server in new window
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$scriptPath'; Write-Host 'Server starting...' -ForegroundColor Green; npm run dev"

# Wait a moment
Start-Sleep -Seconds 3

# Open browser
Start-Process "http://localhost:3000"

Write-Host "Server is starting in a new window..." -ForegroundColor Green
Write-Host ""
Write-Host "Share this URL with others on your network:" -ForegroundColor Yellow
Write-Host "  http://$ipAddress:3000" -ForegroundColor Green -BackgroundColor Black
Write-Host ""
Write-Host "Note: Others must be on the same WiFi network" -ForegroundColor Gray
Write-Host ""

