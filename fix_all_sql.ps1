$files = Get-ChildItem -Path "c:\Users\jonas\Desktop\AMSH\backend\*.sql"

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    
    $content = Get-Content $file.FullName -Raw
    
    # 1. Handle DATETIME defaults
    $content = $content -replace 'DATETIME\s+NOT\s+NULL\s+DEFAULT\s+CURRENT_TIMESTAMP', 'TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP'
    $content = $content -replace 'DATETIME\s+DEFAULT\s+CURRENT_TIMESTAMP', 'TIMESTAMP DEFAULT CURRENT_TIMESTAMP'
    
    # 2. Strip fractional seconds (3)
    $content = $content -replace 'DATETIME\(3\)', 'DATETIME'
    $content = $content -replace 'TIMESTAMP\(3\)', 'TIMESTAMP'
    
    # 3. Handle BOOLEAN defaults
    $content = $content -replace 'BOOLEAN\s+NOT\s+NULL\s+DEFAULT\s+true', 'TINYINT(1) NOT NULL DEFAULT 1'
    $content = $content -replace 'BOOLEAN\s+NOT\s+NULL\s+DEFAULT\s+false', 'TINYINT(1) NOT NULL DEFAULT 0'
    $content = $content -replace 'BOOLEAN\s+NULL\s+DEFAULT\s+true', 'TINYINT(1) NULL DEFAULT 1'
    $content = $content -replace 'BOOLEAN\s+NULL\s+DEFAULT\s+false', 'TINYINT(1) NULL DEFAULT 0'
    
    # 4. Add DROP TABLE IF EXISTS before CREATE TABLE
    # Using regex to find CREATE TABLE `table_name`
    # We only want to do this if it's not already there.
    # $content = $content -replace '(?i)-- CreateTable\s+CREATE TABLE\s+(`\w+`)', "DROP TABLE IF EXISTS `$1`;`n-- CreateTable`nCREATE TABLE `$1`"
    # Actually, simpler: search for CREATE TABLE `name` and prepend DROP.
    # Note: Case insensitive.
    $content = $content -replace '(?i)CREATE TABLE\s+(`\w+`)', 'DROP TABLE IF EXISTS $1;$0'

    # Save as UTF8
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
}
Write-Host "All SQL files updated for MySQL 5.5 compatibility and idempotency."
