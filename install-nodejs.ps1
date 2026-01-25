# PowerShell script to install Node.js automatically
# Run this script as Administrator if needed

Write-Host "🚀 Installing Node.js LTS..." -ForegroundColor Green

# Check if winget is available
if (Get-Command winget -ErrorAction SilentlyContinue) {
    Write-Host "✅ Using Windows Package Manager (winget)..." -ForegroundColor Yellow
    winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
    
    Write-Host ""
    Write-Host "⏳ Waiting 5 seconds for installation to complete..." -ForegroundColor Yellow
    Start-Sleep -Seconds 5
    
    Write-Host ""
    Write-Host "🔄 Refreshing environment variables..." -ForegroundColor Yellow
    $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
    
    Write-Host ""
    Write-Host "✅ Installation complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 Verifying installation..." -ForegroundColor Yellow
    
    # Check if node is now available
    $nodePath = Get-Command node -ErrorAction SilentlyContinue
    if ($nodePath) {
        Write-Host "✅ Node.js installed successfully!" -ForegroundColor Green
        Write-Host "   Version: $(node --version)" -ForegroundColor Cyan
        Write-Host "   npm Version: $(npm --version)" -ForegroundColor Cyan
        Write-Host ""
        Write-Host "🎉 You can now run 'npm install'!" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Node.js installed but not in PATH yet." -ForegroundColor Yellow
        Write-Host "   Please close and reopen PowerShell, then run:" -ForegroundColor Yellow
        Write-Host "   node --version" -ForegroundColor Cyan
    }
} else {
    Write-Host "❌ winget is not available." -ForegroundColor Red
    Write-Host ""
    Write-Host "Please install Node.js manually:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://nodejs.org/" -ForegroundColor Cyan
    Write-Host "2. Download the LTS version" -ForegroundColor Cyan
    Write-Host "3. Run the installer" -ForegroundColor Cyan
    Write-Host "4. Restart PowerShell" -ForegroundColor Cyan
}
