# ======================================================
# [SYSTEM] Starting full GitHub/Git logout procedure...
# ======================================================
Write-Host ""

# 1. Remove GH CLI credentials if installed
$ghPath = Get-Command gh -ErrorAction SilentlyContinue
if ($ghPath) {
    Write-Host "[CLI] GitHub CLI detected. Attempting to logout..." -ForegroundColor Cyan
    gh auth logout -h github.com 2>$null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "[SUCCESS] Disconnected from GitHub CLI." -ForegroundColor Green
    } else {
        Write-Host "[INFO] GitHub CLI was already logged out or not configured." -ForegroundColor Gray
    }
}

# 2. Remove Windows Credential Manager entries
Write-Host "[CREDENTIALS] Searching for GitHub entries in Windows..." -ForegroundColor Cyan

$targets = @(
    "git:https://github.com",
    "LegacyGeneric:target=git:https://github.com",
    "gh:github.com",
    "GitHub - https://api.github.com"
)

foreach ($target in $targets) {
    $found = cmdkey /list | Select-String -Pattern [regex]::Escape($target)
    if ($found) {
        Write-Host "[FOUND] Removing: $target" -ForegroundColor Yellow
        cmdkey /delete:$target > $null
    }
}

# 3. Clear Git Credential Manager cache
$gitPath = Get-Command git -ErrorAction SilentlyContinue
if ($gitPath) {
    Write-Host "[GIT] Clearing local Git Credential Manager store..." -ForegroundColor Cyan
    "url=https://github.com" | git credential-manager erase 2>$null
    git config --global --unset-all credential.helper 2>$null
}

Write-Host ""
Write-Host "======================================================" -ForegroundColor White
Write-Host "[DONE] Logout process complete." -ForegroundColor Green
Write-Host "[TIP] Next time you pull/push, you will be asked for credentials." -ForegroundColor Gray
Write-Host "======================================================" -ForegroundColor White
Write-Host ""
Pause
