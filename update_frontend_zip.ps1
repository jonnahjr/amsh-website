# update_frontend_zip.ps1
# This script builds the frontend in standalone mode and creates a zip file for deployment.

$ErrorActionPreference = "Stop"
$WorkspaceRoot = "c:\Users\jonas\Desktop\AMSH"
$FrontendSrc = Join-Path $WorkspaceRoot "frontend"
$ToDeployDir = Join-Path $WorkspaceRoot "to_deploy"
$FrontendBundleDir = Join-Path $ToDeployDir "frontend_bundle"
$FrontendSubDir = Join-Path $FrontendBundleDir "frontend"
$ZipPath = Join-Path $ToDeployDir "frontend.zip"

Write-Host "Building Frontend (Next.js standalone)..." -ForegroundColor Cyan
Set-Location $FrontendSrc
npm run build
if ($LASTEXITCODE -ne 0) { throw "Frontend build failed!" }

Write-Host "Assembling frontend bundle..." -ForegroundColor Cyan
if (Test-Path $FrontendBundleDir) { Remove-Item -Recurse -Force $FrontendBundleDir }
New-Item -ItemType Directory -Path $FrontendSubDir | Out-Null

$StandaloneDir = Join-Path $FrontendSrc ".next\standalone\frontend"
if (-not (Test-Path $StandaloneDir)) {
    throw "Standalone output not found at $StandaloneDir. Ensure next.config.ts has output: 'standalone'."
}

# Copy standalone output
Copy-Item -Recurse "$StandaloneDir\*" $FrontendSubDir -Force

# Copy static assets
$StaticSrc = Join-Path $FrontendSrc ".next\static"
$StaticDest = Join-Path $FrontendSubDir ".next\static"
if (Test-Path $StaticSrc) {
    if (-not (Test-Path $StaticDest)) { New-Item -ItemType Directory -Path $StaticDest -Force | Out-Null }
    Copy-Item -Recurse "$StaticSrc\*" $StaticDest -Force
}

# Copy public assets
$PublicSrc = Join-Path $FrontendSrc "public"
$PublicDest = Join-Path $FrontendSubDir "public"
if (Test-Path $PublicSrc) {
    if (-not (Test-Path $PublicDest)) { New-Item -ItemType Directory -Path $PublicDest -Force | Out-Null }
    Copy-Item -Recurse "$PublicSrc\*" $PublicDest -Force
}

Write-Host "Creating zip file: $ZipPath" -ForegroundColor Cyan
if (Test-Path $ZipPath) { Remove-Item $ZipPath }
Set-Location $FrontendBundleDir
tar -a -c -f $ZipPath frontend

Set-Location $WorkspaceRoot
# Remove-Item -Recurse -Force $FrontendBundleDir # Keep it for verification if needed, or remove it.
# Actually, let's keep it to match the user's current 'to_deploy/frontend' structure if they prefer.
# But I'll use a fresh name for the bundle to avoid conflicts.

Write-Host "Success! Frontend zip created at $ZipPath" -ForegroundColor Green
