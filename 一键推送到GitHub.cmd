@echo off
cd /d "%~dp0"
echo ======================================================
echo   Push SwitchCN.ai to Your GitHub Repository
echo ======================================================
echo.
echo Step 1: Open https://github.com/new in your browser
echo Step 2: Create an EMPTY repository (e.g. china-ai-calc)
echo         (Do NOT check Add a README or .gitignore)
echo.
set /p REPO_URL="Paste your GitHub repo HTTPS URL here and press Enter: "
if "%REPO_URL%"=="" (
  echo No URL entered. Exiting.
  pause
  exit /b 1
)
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git branch -M main
echo.
echo Pushing to %REPO_URL% ... (If a GitHub login window pops up, click Sign in with browser)
git push -u origin main
echo.
echo Done! Now go to https://vercel.com/new to import and deploy.
pause
