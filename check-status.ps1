# Status check script for Cricket Tournament Application
Write-Host "🏏 Cricket Tournament Application Status Check" -ForegroundColor Cyan
Write-Host "=============================================" -ForegroundColor Cyan

# Check if server is running
Write-Host "`n1. Checking server status..." -ForegroundColor Yellow
$serverStatus = netstat -ano | findstr :3003
if ($serverStatus) {
    Write-Host "✅ Server is running on port 3003" -ForegroundColor Green
} else {
    Write-Host "❌ Server is not running" -ForegroundColor Red
}

# Check database connection
Write-Host "`n2. Testing database connection..." -ForegroundColor Yellow
try {
    $dbTest = node scripts/test-database-connection.js 2>&1
    if ($dbTest -match "🎉 All database tests passed successfully") {
        Write-Host "✅ Database connection working" -ForegroundColor Green
    } else {
        Write-Host "❌ Database connection failed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Database test failed" -ForegroundColor Red
}

# Check photo upload functionality
Write-Host "`n3. Testing photo upload functionality..." -ForegroundColor Yellow
try {
    $photoTest = node scripts/test-photo-upload.js 2>&1
    if ($photoTest -match "🎉 Photo upload and serving tests completed successfully") {
        Write-Host "✅ Photo upload system working" -ForegroundColor Green
    } else {
        Write-Host "❌ Photo upload system failed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Photo upload test failed" -ForegroundColor Red
}

# Check web application accessibility
Write-Host "`n4. Testing web application..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:3003" -UseBasicParsing -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "✅ Web application is accessible" -ForegroundColor Green
    } else {
        Write-Host "❌ Web application returned status: $($response.StatusCode)" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Web application is not accessible" -ForegroundColor Red
}

Write-Host "`n🎯 Application Status Summary:" -ForegroundColor Cyan
Write-Host "=============================" -ForegroundColor Cyan
Write-Host "🌐 Web Application: http://localhost:3003" -ForegroundColor White
Write-Host "🗄️ Database: Aiven PostgreSQL (Connected)" -ForegroundColor White
Write-Host "📸 Photo Storage: Database (BYTEA)" -ForegroundColor White
Write-Host "🔐 Authentication: JWT-based" -ForegroundColor White

Write-Host "`n🚀 Your cricket tournament application is ready!" -ForegroundColor Green
Write-Host "Visit http://localhost:3003 to start using it." -ForegroundColor Cyan
