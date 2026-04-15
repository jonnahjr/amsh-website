# package_production.ps1
# Creates AMSH_PRODUCTION_FINAL.zip with correct compiled build artifacts.
# Frontend: Next.js standalone output (server.js + .next/ + public/)
# Backend:  compiled dist/ + node_modules + prisma + .env + package.json
#
# Run from: c:\Users\jonas\Desktop\AMSH\
# Usage: .\package_production.ps1

$ErrorActionPreference = "Stop"
$WorkspaceRoot = "c:\Users\jonas\Desktop\AMSH"
$ToDeployDir   = Join-Path $WorkspaceRoot "to_deploy"
$Timestamp    = Get-Date -Format "yyyyMMdd_HHmmss"
$BundleName    = "AMSH_BUILD_$Timestamp"
$BundleDir     = Join-Path $ToDeployDir $BundleName
$ZipPath       = Join-Path $ToDeployDir "AMSH_PRODUCTION_FINAL.zip"

# ── 0. Clean previous ZIP (but don't delete directory if locked) ───────────────
Write-Host ""
Write-Host "[1/6] Preparing build directory $BundleName ..." -ForegroundColor Cyan
if (Test-Path $ZipPath) { Remove-Item -Force $ZipPath }
New-Item -ItemType Directory -Path $BundleDir | Out-Null

# ── 1. Build Frontend (Next.js standalone) ───────────────────────────────────
Write-Host ""
Write-Host "[2/6] Building Frontend (Next.js standalone) ..." -ForegroundColor Cyan
Set-Location (Join-Path $WorkspaceRoot "frontend")
npm run build
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed!" }
Set-Location $WorkspaceRoot

# ── 2. Assemble Frontend Bundle ──────────────────────────────────────────────
Write-Host ""
Write-Host "[3/6] Assembling frontend bundle ..." -ForegroundColor Cyan
$FrontendSrc  = Join-Path $WorkspaceRoot "frontend\.next\standalone\frontend"
$FrontendDest = Join-Path $BundleDir "frontend"

if (-not (Test-Path "$FrontendSrc\server.js")) {
    throw "ERROR: server.js not found at $FrontendSrc. Check that next.config.ts has output:'standalone'."
}

# Copy the standalone output (server.js, package.json, .env.production, node_modules/, .next/)
Copy-Item -Recurse $FrontendSrc $FrontendDest -Force

# Merge static assets into .next/static (required by server.js)
$StaticSrc  = Join-Path $WorkspaceRoot "frontend\.next\static"
$StaticDest = Join-Path $FrontendDest ".next\static"
if (Test-Path $StaticSrc) {
    if (!(Test-Path $StaticDest)) { New-Item -ItemType Directory -Path $StaticDest -Force | Out-Null }
    Copy-Item -Recurse "$StaticSrc\*" $StaticDest -Force
    Write-Host "  OK: .next/static copied" -ForegroundColor Green
} else {
    Write-Warning "  WARN: frontend/.next/static not found - skipping"
}

# Merge public/ assets
$PublicSrc  = Join-Path $WorkspaceRoot "frontend\public"
$PublicDest = Join-Path $FrontendDest "public"
if (Test-Path $PublicSrc) {
    if (!(Test-Path $PublicDest)) { New-Item -ItemType Directory -Path $PublicDest -Force | Out-Null }
    Copy-Item -Recurse "$PublicSrc\*" $PublicDest -Force
    Write-Host "  OK: public/ copied" -ForegroundColor Green
} else {
    Write-Warning "  WARN: frontend/public not found - skipping"
}

$serverJsExists = Test-Path (Join-Path $FrontendDest "server.js")
Write-Host "  OK: Frontend assembled. server.js present: $serverJsExists" -ForegroundColor Green

# ── 3. Build Backend (TypeScript to dist/) ────────────────────────────────────
Write-Host ""
Write-Host "[4/6] Building Backend (TypeScript -> dist/) ..." -ForegroundColor Cyan
Set-Location (Join-Path $WorkspaceRoot "backend")
npm run build
if ($LASTEXITCODE -ne 0) { throw "Backend build failed!" }
Set-Location $WorkspaceRoot

# ── 4. Assemble Backend Bundle ───────────────────────────────────────────────
Write-Host ""
Write-Host "[5/6] Assembling backend bundle ..." -ForegroundColor Cyan
$BackendSrc  = Join-Path $WorkspaceRoot "backend"
$BackendDest = Join-Path $BundleDir "backend"
New-Item -ItemType Directory -Path $BackendDest | Out-Null

# Compiled output
Copy-Item -Recurse "$BackendSrc\dist" $BackendDest -Force
Write-Host "  OK: dist/ copied" -ForegroundColor Green

# Runtime configuration
Copy-Item "$BackendSrc\package.json"      $BackendDest -Force
Copy-Item "$BackendSrc\package-lock.json" $BackendDest -Force

if (Test-Path "$BackendSrc\.env") {
    Copy-Item "$BackendSrc\.env" $BackendDest -Force
    Write-Host "  OK: .env copied" -ForegroundColor Green
} else {
    Write-Warning "  WARN: backend/.env not found - remember to set env vars in Plesk!"
}

if (Test-Path "$BackendSrc\.env.example") {
    Copy-Item "$BackendSrc\.env.example" $BackendDest -Force
}

# Prisma schema (needed for prisma generate on server)
if (Test-Path "$BackendSrc\prisma") {
    Copy-Item -Recurse "$BackendSrc\prisma" $BackendDest -Force
    Write-Host "  OK: prisma/ copied" -ForegroundColor Green
}

# public/ folder -> storage/ (to bypass Plesk Nginx interception)
if (Test-Path "$BackendSrc\public") {
    $StorageDest = Join-Path $BackendDest "storage"
    New-Item -ItemType Directory -Path $StorageDest -Force | Out-Null
    # Exclude 'uploads' to prevent overwriting existing server assets
    Get-ChildItem -Path "$BackendSrc\public\*" -Exclude "uploads" | ForEach-Object {
        Copy-Item -Path $_.FullName -Destination $StorageDest -Recurse -Force
    }
    Write-Host "  OK: backend/public/ (code only) -> backend/storage/ (Bypass enabled)" -ForegroundColor Green
}

# (Backend node_modules are omitted here because setup.sh will run npm ci on the server)
# ── Generate setup.sh for server execution ───────────────────────────────────
$SetupScript = @'
#!/bin/bash
# setup.sh — Run this on the server after extracting the deployment zip.
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
echo "✅ SETUP COMPLETE"
echo "===================================================="
'@
$SetupScript | Set-Content -Path "$BackendDest\setup.sh" -Encoding UTF8 -NoNewline
Write-Host "  OK: setup.sh generated" -ForegroundColor Green

# ── 5. Add SQL schema and README ─────────────────────────────────────────────
$SqlSrc = Join-Path $ToDeployDir "database_schema.sql"
if (Test-Path $SqlSrc) {
    Copy-Item $SqlSrc $BundleDir -Force
    Write-Host "  OK: database_schema.sql included" -ForegroundColor Green
}

$FixSqlSrc = Join-Path $ToDeployDir "AMSH_FIX_DATABASE.sql"
if (Test-Path $FixSqlSrc) {
    Copy-Item $FixSqlSrc $BundleDir -Force
    Write-Host "  OK: AMSH_FIX_DATABASE.sql included" -ForegroundColor Green
}

$FinalSyncSqlSrc = Join-Path $ToDeployDir "FINAL_RESEARCH_SYNC.sql"
if (Test-Path $FinalSyncSqlSrc) {
    Copy-Item $FinalSyncSqlSrc $BundleDir -Force
    Write-Host "  OK: FINAL_RESEARCH_SYNC.sql included" -ForegroundColor Green
}

$NginxSrc = Join-Path $ToDeployDir "NGINX_CORS_FIX.conf"
if (Test-Path $NginxSrc) {
    Copy-Item $NginxSrc $BundleDir -Force
    Write-Host "  OK: NGINX_CORS_FIX.conf included" -ForegroundColor Green
}

$CriticalSqlSrc = Join-Path $ToDeployDir "CRITICAL_DATABASE_FIX.sql"
if (Test-Path $CriticalSqlSrc) {
    Copy-Item $CriticalSqlSrc $BundleDir -Force
    Write-Host "  OK: CRITICAL_DATABASE_FIX.sql included" -ForegroundColor Green
}

$FixJsonSrc = Join-Path $WorkspaceRoot "backend\scratch\fix_staff_json.js"
if (Test-Path $FixJsonSrc) {
    Copy-Item $FixJsonSrc $BundleDir -Force
    Write-Host "  OK: fix_staff_json.js included" -ForegroundColor Green
}

$InstSqlSrc = Join-Path $ToDeployDir "INIT_INSTITUTIONS.sql"
if (Test-Path $InstSqlSrc) {
    Copy-Item $InstSqlSrc $BundleDir -Force
    Write-Host "  OK: INIT_INSTITUTIONS.sql included" -ForegroundColor Green
}

$FixSettingsSqlSrc = Join-Path $ToDeployDir "FIX_SETTINGS_TABLE.sql"
if (Test-Path $FixSettingsSqlSrc) {
    Copy-Item $FixSettingsSqlSrc $BundleDir -Force
    Write-Host "  OK: FIX_SETTINGS_TABLE.sql included" -ForegroundColor Green
}

$UltimateFixSqlSrc = Join-Path $ToDeployDir "ULTIMATE_DATABASE_FIX_V2.sql"
if (Test-Path $UltimateFixSqlSrc) {
    Copy-Item $UltimateFixSqlSrc $BundleDir -Force
    Write-Host "  OK: ULTIMATE_DATABASE_FIX_V2.sql included" -ForegroundColor Green
}

$ReadmeSrc = Join-Path $ToDeployDir "PRODUCTION_DEPLOYMENT_README.md"
if (Test-Path $ReadmeSrc) {
    Copy-Item $ReadmeSrc $BundleDir -Force
}

# ── 6. Zip the Bundle ────────────────────────────────────────────────────────
Write-Host ""
Write-Host "[6/6] Creating ZIP: $ZipPath ..." -ForegroundColor Cyan
Set-Location $BundleDir
tar -a -c -f $ZipPath *
if ($LASTEXITCODE -ne 0) { throw "Zip creation failed!" }
Set-Location $WorkspaceRoot

# ── Done ─────────────────────────────────────────────────────────────────────
$ZipSizeMB = [math]::Round((Get-Item $ZipPath).Length / 1MB, 1)
Write-Host ""
Write-Host "========================================================" -ForegroundColor Green
Write-Host "  SUCCESS: AMSH_PRODUCTION_FINAL.zip created!" -ForegroundColor Green
Write-Host "========================================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Zip:  $ZipPath"
Write-Host "  Size: $ZipSizeMB MB"
Write-Host ""
Write-Host "  Frontend entry: frontend/server.js"
Write-Host "  Backend entry:  backend/dist/index.js"
Write-Host ""
Write-Host "  IMPORTANT: After uploading backend/ to your panel (Plesk/cPanel):" -ForegroundColor Yellow
Write-Host "    1. Click the 'NPM Install' button in your Node.js settings." -ForegroundColor Yellow
Write-Host "    2. This will natively install dependencies and generate the Database Client." -ForegroundColor Yellow
Write-Host ""
Write-Host "  Deploy guide:   $BundleDir\PRODUCTION_DEPLOYMENT_README.md"
Write-Host ""
