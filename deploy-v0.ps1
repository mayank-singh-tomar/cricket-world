# v0 Deployment Script for Cricket Tournament App
Write-Host "🚀 Cricket Tournament App - v0 Deployment" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan

# Check if git is initialized
Write-Host "`n1. Checking Git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✅ Git repository found" -ForegroundColor Green
} else {
    Write-Host "❌ Git repository not found. Initializing..." -ForegroundColor Red
    git init
    git add .
    git commit -m "Initial commit for v0 deployment"
    Write-Host "✅ Git repository initialized" -ForegroundColor Green
}

# Check if all required files exist
Write-Host "`n2. Checking required files..." -ForegroundColor Yellow
$requiredFiles = @("package.json", "next.config.mjs", "tsconfig.json", "tailwind.config.ts", "postcss.config.mjs")
foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ $file found" -ForegroundColor Green
    } else {
        Write-Host "❌ $file missing" -ForegroundColor Red
    }
}

# Check if v0.json exists
if (Test-Path "v0.json") {
    Write-Host "✅ v0.json found" -ForegroundColor Green
} else {
    Write-Host "❌ v0.json missing" -ForegroundColor Red
}

# Test database connection
Write-Host "`n3. Testing database connection..." -ForegroundColor Yellow
try {
    $dbTest = node scripts/test-database-connection.js 2>&1
    if ($dbTest -match "🎉 All database tests passed successfully") {
        Write-Host "✅ Database connection successful" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Database test failed" -ForegroundColor Red
}

Write-Host "`n🎯 v0 DEPLOYMENT READY!" -ForegroundColor Green
Write-Host "=====================" -ForegroundColor Green

Write-Host "`n📋 Next steps for v0 deployment:" -ForegroundColor Cyan
Write-Host "1. Go to https://v0.dev" -ForegroundColor White
Write-Host "2. Click 'Deploy' or 'Import Project'" -ForegroundColor White
Write-Host "3. Connect your GitHub repository" -ForegroundColor White
Write-Host "4. Set environment variables in v0 dashboard:" -ForegroundColor White
Write-Host "   - DB_USER=your_db_user" -ForegroundColor White
Write-Host "   - DB_HOST=your_db_host" -ForegroundColor White
Write-Host "   - DB_NAME=your_db_name" -ForegroundColor White
Write-Host "   - DB_PASSWORD=your_db_password" -ForegroundColor White
Write-Host "   - DB_PORT=your_db_port" -ForegroundColor White
Write-Host "   - JWT_SECRET=your-super-secret-jwt-key-here" -ForegroundColor White
Write-Host "   - NEXT_TELEMETRY_DISABLED=1" -ForegroundColor White
Write-Host "5. Deploy your application" -ForegroundColor White

Write-Host "`n🌐 Alternative: Deploy via Vercel CLI" -ForegroundColor Cyan
Write-Host "1. Run: vercel login" -ForegroundColor White
Write-Host "2. Run: vercel --prod" -ForegroundColor White

Write-Host "`n🎉 Your cricket tournament app is ready for v0 deployment!" -ForegroundColor Green
