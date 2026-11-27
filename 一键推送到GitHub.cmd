@echo off
cd /d "%~dp0"
git remote remove origin >nul 2>&1
git remote add origin https://github.com/kkko9028-design/china-ai-calc.git
git branch -M main
echo Pushing to https://github.com/kkko9028-design/china-ai-calc.git ...
echo If a GitHub login window pops up, click "Sign in with your browser".
git push -u origin main
echo.
echo Done! Now open https://vercel.com/new to import and deploy.
pause
