# Set environment variables to disable telemetry and avoid permission issues
$env:NEXT_TELEMETRY_DISABLED = "1"
$env:NODE_ENV = "development"
$env:NEXT_SHARP_PATH = ""

# Kill any existing Node.js processes
Write-Host "Stopping any existing Node.js processes..." -ForegroundColor Yellow
taskkill /F /IM node.exe 2>$null

# Remove .next directory if it exists to avoid permission issues
if (Test-Path ".next") {
    Write-Host "Removing .next directory..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".next" -ErrorAction SilentlyContinue
}

# Clear npm cache
Write-Host "Clearing npm cache..." -ForegroundColor Yellow
npm cache clean --force 2>$null

# Start the development server
Write-Host "Starting Next.js development server on port 3003..." -ForegroundColor Green
Write-Host "Access your application at: http://localhost:3003" -ForegroundColor Cyan

# Start the server with proper error handling
try {
    npx next dev --port 3003 --turbo
} catch {
    Write-Host "Error starting server. Trying alternative method..." -ForegroundColor Red
    npm run dev
}
