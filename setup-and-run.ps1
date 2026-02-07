# BI Dashboard Portal - Automated Setup and Run Script
# This script will check for Node.js and guide you through setup

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  BI Dashboard Portal - Setup & Run" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "Checking for Node.js..." -ForegroundColor Yellow
$nodePath = $null

# Try to find node.exe in common locations
$possiblePaths = @(
    "$env:ProgramFiles\nodejs\node.exe",
    "${env:ProgramFiles(x86)}\nodejs\node.exe",
    "$env:LOCALAPPDATA\Programs\nodejs\node.exe",
    "$env:ProgramData\nodejs\node.exe"
)

foreach ($path in $possiblePaths) {
    if (Test-Path $path) {
        $nodePath = $path
        Write-Host "Found Node.js at: $path" -ForegroundColor Green
        break
    }
}

# Try using 'node' command
if (-not $nodePath) {
    try {
        $nodeVersion = node --version 2>$null
        if ($nodeVersion) {
            Write-Host "Node.js is installed! Version: $nodeVersion" -ForegroundColor Green
            $nodePath = "node"
        }
    } catch {
        # Node not in PATH
    }
}

if (-not $nodePath) {
    Write-Host ""
    Write-Host "ERROR: Node.js is NOT installed!" -ForegroundColor Red
    Write-Host ""
    Write-Host "You need to install Node.js first:" -ForegroundColor Yellow
    Write-Host "1. Go to: https://nodejs.org/" -ForegroundColor White
    Write-Host "2. Download the LTS version (green button)" -ForegroundColor White
    Write-Host "3. Run the installer and follow the prompts" -ForegroundColor White
    Write-Host "4. Make sure 'Add to PATH' is checked during installation" -ForegroundColor White
    Write-Host "5. Restart your computer" -ForegroundColor White
    Write-Host "6. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Opening Node.js download page..." -ForegroundColor Cyan
    Start-Process "https://nodejs.org/"
    Write-Host ""
    Write-Host "Press any key to exit..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}

# Node.js is installed, proceed with setup
Write-Host ""
Write-Host "Node.js found! Proceeding with setup..." -ForegroundColor Green
Write-Host ""

# Change to script directory
$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptDir

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Write-Host "This may take a few minutes..." -ForegroundColor Gray
    npm install
    if ($LASTEXITCODE -ne 0) {
        Write-Host ""
        Write-Host "ERROR: Failed to install dependencies!" -ForegroundColor Red
        Write-Host "Please check your internet connection and try again." -ForegroundColor Yellow
        Write-Host ""
        Write-Host "Press any key to exit..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
        exit 1
    }
    Write-Host "Dependencies installed successfully!" -ForegroundColor Green
} else {
    Write-Host "Dependencies already installed." -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Starting Development Server..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "The website will open at: http://localhost:3000" -ForegroundColor Yellow
Write-Host ""
Write-Host "Login Credentials:" -ForegroundColor Cyan
Write-Host "  Team Head: john@example.com / password123" -ForegroundColor White
Write-Host "  Sales User: jane@example.com / password123" -ForegroundColor White
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Gray
Write-Host ""

# Start the development server
npm run dev



