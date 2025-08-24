const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Cricket Tournament App - Vercel Deployment Helper');
console.log('==================================================');

// Check if vercel CLI is installed
try {
  execSync('vercel --version', { stdio: 'ignore' });
  console.log('✅ Vercel CLI is installed');
} catch (error) {
  console.log('❌ Vercel CLI not found. Installing...');
  try {
    execSync('npm install -g vercel', { stdio: 'inherit' });
    console.log('✅ Vercel CLI installed successfully');
  } catch (installError) {
    console.log('❌ Failed to install Vercel CLI. Please install manually:');
    console.log('   npm install -g vercel');
    process.exit(1);
  }
}

// Check if .env.local exists
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('✅ .env.local file found');
} else {
  console.log('⚠️  .env.local file not found. Creating template...');
     const envTemplate = `# Database Configuration
 DB_USER=your_db_user
 DB_HOST=your_db_host
 DB_NAME=your_db_name
 DB_PASSWORD=your_db_password
 DB_PORT=your_db_port

 # JWT Secret (change this in production)
 JWT_SECRET=your-super-secret-jwt-key-here

 # Next.js Configuration
 NEXT_TELEMETRY_DISABLED=1
 `;
  fs.writeFileSync(envPath, envTemplate);
  console.log('✅ .env.local template created');
}

// Check if package.json exists
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  console.log('✅ package.json found');
} else {
  console.log('❌ package.json not found. Please run this script from the project root.');
  process.exit(1);
}

// Check if vercel.json exists
const vercelPath = path.join(process.cwd(), 'vercel.json');
if (fs.existsSync(vercelPath)) {
  console.log('✅ vercel.json found');
} else {
  console.log('❌ vercel.json not found. Please create it first.');
  process.exit(1);
}

// Test database connection
console.log('\n🔍 Testing database connection...');
try {
  execSync('node scripts/test-database-connection.js', { stdio: 'inherit' });
  console.log('✅ Database connection successful');
} catch (error) {
  console.log('❌ Database connection failed. Please check your credentials.');
  process.exit(1);
}

// Build the application
console.log('\n🔨 Building the application...');
try {
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build successful');
} catch (error) {
  console.log('❌ Build failed. Please fix the errors before deploying.');
  process.exit(1);
}

console.log('\n🎉 Ready for deployment!');
console.log('\n📋 Next steps:');
console.log('1. Run: vercel login (if not already logged in)');
console.log('2. Run: vercel');
console.log('3. Follow the prompts to deploy');
console.log('4. Set environment variables in Vercel dashboard');
console.log('\n🔐 Required environment variables for Vercel:');
console.log('   DB_USER=your_db_user');
console.log('   DB_HOST=your_db_host');
console.log('   DB_NAME=your_db_name');
console.log('   DB_PASSWORD=your_db_password');
console.log('   DB_PORT=your_db_port');
console.log('   JWT_SECRET=your-super-secret-jwt-key-here');
console.log('   NEXT_TELEMETRY_DISABLED=1');

console.log('\n🚀 Your cricket tournament app is ready to deploy to Vercel!');
