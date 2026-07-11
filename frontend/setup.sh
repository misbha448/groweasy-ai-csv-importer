#!/bin/bash

# Frontend Setup Script
# Initializes the Next.js frontend with all dependencies

echo "🚀 GrowEasy Frontend Setup"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
  echo "❌ Node.js is not installed. Please install Node.js >= 18"
  exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
  echo "✅ Dependencies installed successfully"
else
  echo "❌ Failed to install dependencies"
  exit 1
fi

echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
  echo "📝 Creating .env.local..."
  cp .env.example .env.local
  echo "✅ .env.local created (update with your configuration)"
else
  echo "✅ .env.local already exists"
fi

echo ""

# Build for production to check for errors
echo "🔨 Building for production (this may take a moment)..."
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Production build successful"
else
  echo "❌ Production build failed"
  exit 1
fi

echo ""
echo "=========================="
echo "✅ Setup Complete!"
echo "=========================="
echo ""
echo "Next steps:"
echo "1. Update .env.local with your API URL"
echo "2. Run: npm run dev"
echo "3. Open the URL printed by Next.js"
echo ""
