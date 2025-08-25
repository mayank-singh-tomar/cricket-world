#!/bin/bash

echo "🚀 Setting up Cricket Tournament Registration System"
echo "=================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "❌ PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "✅ Node.js and PostgreSQL are installed"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local file..."
    cat > .env.local << EOF
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=cricket_tournament
DB_USER=postgres
DB_PASSWORD=password

# JWT Secret (change this in production)
JWT_SECRET=your-secret-key-change-in-production

# Razorpay Configuration (for payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
EOF
    echo "✅ Created .env.local file"
    echo "⚠️  Please update the database password and other settings in .env.local"
else
    echo "✅ .env.local file already exists"
fi

# Create uploads directory
echo "📁 Creating uploads directory..."
mkdir -p public/uploads/user-photos
echo "✅ Created uploads directory"

# Setup database
echo "🗄️  Setting up database..."
npm run db:setup

echo ""
echo "🎉 Setup completed!"
echo ""
echo "Next steps:"
echo "1. Update the database password in .env.local"
echo "2. Start the development server: npm run dev"
echo "3. Open http://localhost:3000 in your browser"
echo ""
echo "For more information, see the README.md file"



