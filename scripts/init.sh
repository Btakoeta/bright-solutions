#!/bin/bash

set -e

echo "🚀 Bright Solutions - Project Initialization"
echo "=============================================="

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed."
    exit 1
fi

echo "✅ npm $(npm --version) found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm run install-all

# Check PostgreSQL
echo ""
echo "🔍 Checking PostgreSQL..."
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL is not installed or not in PATH"
    echo "   Please install PostgreSQL: https://www.postgresql.org/download/"
    echo "   After installing, run: npm run init:db"
    exit 1
fi

echo "✅ PostgreSQL found"

# Setup .env
echo ""
echo "⚙️  Setting up environment variables..."

if [ ! -f "backend/.env" ]; then
    cp backend/.env.example backend/.env
    echo "✅ Created backend/.env"
    echo "   📝 Please update DATABASE_URL in backend/.env with your PostgreSQL credentials"
else
    echo "ℹ️  backend/.env already exists"
fi

# Initialize database
echo ""
echo "🗄️  Initializing database..."
cd backend

# Generate Prisma client
npx prisma generate
echo "✅ Prisma client generated"

# Run migrations
npx prisma migrate dev --skip-generate
echo "✅ Database migrations completed"

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "  1. Update backend/.env with your database credentials"
echo "  2. Run: npm run dev"
echo "  3. Open http://localhost:5173 in your browser"
echo ""
echo "For more information, see SETUP.md"
