# package_all.ps1
# Script to build and package AMSH frontend and backend into a single zip for Plesk deployment

$WorkspaceRoot = Get-Location
$ToDeployDir = Join-Path $WorkspaceRoot "to_deploy"

# Ensure to_deploy is clean
echo "Cleaning to_deploy folder..."
if (Test-Path $ToDeployDir) {
    Remove-Item -Recurse -Force "$ToDeployDir\*"
} else {
    New-Item -ItemType Directory -Path $ToDeployDir
}

# Create a temporary unified structure
$BundleTemp = Join-Path $ToDeployDir "bundle_temp"
if (Test-Path $BundleTemp) { Remove-Item -Recurse -Force $BundleTemp }
New-Item -ItemType Directory -Path $BundleTemp

# --- Build Frontend ---
echo "Building Frontend..."
Set-Location (Join-Path $WorkspaceRoot "frontend")
npm run build

# Prepare Frontend in bundle
$FrontendDest = Join-Path $BundleTemp "frontend"
if (!(Test-Path $FrontendDest)) { New-Item -ItemType Directory -Path $FrontendDest }

# Copy standalone output
# It's in .next/standalone/frontend
Copy-Item -Recurse ".next\standalone\frontend\*" $FrontendDest

# Copy static and public
$FrontendStaticDest = Join-Path $FrontendDest ".next\static"
if (!(Test-Path $FrontendStaticDest)) { New-Item -ItemType Directory -Path $FrontendStaticDest -Force }
if (Test-Path ".next\static") { Copy-Item -Recurse ".next\static\*" $FrontendStaticDest -Force }

$FrontendPublicDest = Join-Path $FrontendDest "public"
if (!(Test-Path $FrontendPublicDest)) { New-Item -ItemType Directory -Path $FrontendPublicDest -Force }
if (Test-Path "public") { Copy-Item -Recurse "public\*" $FrontendPublicDest -Force }

Set-Location $WorkspaceRoot

# --- Create Frontend Zip (Separate) ---
$FrontendZip = Join-Path $ToDeployDir "amsh-frontend-latest.zip"
echo "Zipping frontend only into $FrontendZip..."
Set-Location $FrontendDest
tar -a -c -f $FrontendZip *
Set-Location $WorkspaceRoot

# --- Build Backend ---
echo "Building Backend..."
Set-Location (Join-Path $WorkspaceRoot "backend")
npm run build

# Prepare Backend in bundle
$BackendDest = Join-Path $BundleTemp "backend"
if (!(Test-Path $BackendDest)) { New-Item -ItemType Directory -Path $BackendDest }

# Copy files needed for backend
# dist, package.json, prisma, .env, node_modules
Copy-Item -Recurse "dist" $BackendDest -Force
Copy-Item "package.json" $BackendDest -Force
Copy-Item "package-lock.json" $BackendDest -Force
if (Test-Path ".env") { Copy-Item ".env" $BackendDest -Force }
if (Test-Path "prisma") { Copy-Item -Recurse "prisma" $BackendDest -Force }

echo "Copying Backend node_modules (this may take a minute)..."
if (Test-Path "node_modules") {
    # Using robocopy for faster/more reliable copy of large folders
    robocopy "node_modules" (Join-Path $BackendDest "node_modules") /E /NFL /NDL /NJH /NJS /nc /ns /np
}

Set-Location $WorkspaceRoot

# --- Additional Root Files ---
if (Test-Path ".htaccess") {
    Copy-Item ".htaccess" $BundleTemp -Force
}
if (Test-Path "to_deploy/amsh_deployment_schema_final.sql") {
    Copy-Item "to_deploy/amsh_deployment_schema_final.sql" (Join-Path $BundleTemp "install_database.sql") -Force
}

# --- Create Unified Zip ---
$FinalZip = Join-Path $ToDeployDir "amsh-full-deployment.zip"
echo "Zipping everything into $FinalZip (using tar)..."
Set-Location $BundleTemp
tar -a -c -f $FinalZip *
Set-Location $WorkspaceRoot

# Cleanup bundle temp
# Remove-Item -Recurse -Force $BundleTemp

echo "`nSuccess! Deployment files created:"
echo "- Full Zip: $FinalZip"
echo "- Frontend Only: $FrontendZip"
echo "Location: $ToDeployDir"

