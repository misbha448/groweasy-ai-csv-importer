@echo off
REM Frontend Setup Script for Windows
REM Initializes the Next.js frontend with all dependencies

echo.
echo 🚀 GrowEasy Frontend Setup
echo ==========================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
  echo ❌ Node.js is not installed. Please install Node.js ^>= 18
  exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js version: %NODE_VERSION%

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm version: %NPM_VERSION%
echo.

REM Install dependencies
echo 📦 Installing dependencies...
call npm install

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Failed to install dependencies
  exit /b 1
)

echo ✅ Dependencies installed successfully
echo.

REM Create .env.local if it doesn't exist
if not exist .env.local (
  echo 📝 Creating .env.local...
  copy .env.example .env.local
  echo ✅ .env.local created (update with your configuration)
) else (
  echo ✅ .env.local already exists
)

echo.

REM Build for production to check for errors
echo 🔨 Building for production (this may take a moment)...
call npm run build

if %ERRORLEVEL% NEQ 0 (
  echo ❌ Production build failed
  exit /b 1
)

echo ✅ Production build successful
echo.

echo ==========================
echo ✅ Setup Complete!
echo ==========================
echo.
echo Next steps:
echo 1. Update .env.local with your API URL
echo 2. Run: npm run dev
echo 3. Open: http://localhost:3000
echo.
pause
