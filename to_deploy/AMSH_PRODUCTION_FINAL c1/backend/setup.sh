#!/bin/bash
# setup.sh â€” Run this on the server after extracting the deployment zip.
# It installs dependencies natively (preserving Linux execute bits) and
# generates the Prisma client.
set -e

BACKEND_DIR="$(dirname "$0")"
cd "$BACKEND_DIR"

echo "[1/3] Installing backend dependencies (npm ci)..."
npm ci --omit=dev

echo "[2/3] Fixing binary permissions..."
chmod +x node_modules/.bin/* 2>/dev/null || true

echo "[3/3] Generating Prisma client..."
npx prisma generate

echo "[4/4] Setting up storage permissions..."
mkdir -p storage/uploads/departments
mkdir -p storage/uploads/heads
mkdir -p storage/uploads/gallery
mkdir -p storage/uploads/s4
mkdir -p storage/uploads/staff
mkdir -p public/uploads
chmod -R 775 storage
chmod -R 775 public
chown -R www-data:www-data storage public 2>/dev/null || true

echo ""
echo "===================================================="
echo "âœ… SETUP COMPLETE"
echo "===================================================="