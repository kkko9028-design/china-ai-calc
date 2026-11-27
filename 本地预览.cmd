@echo off
cd /d "%~dp0"
echo Cleaning stale cache and freeing port 3000...
for /f "tokens=5" %%a in ('netstat -aon ^| findstr :3000 ^| findstr LISTENING') do taskkill /F /PID %%a >nul 2>&1
if exist .next rmdir /s /q .next
echo Starting SwitchCN.ai local preview on http://localhost:3000 ...
start "" cmd /c "timeout /t 4 /nobreak >nul & start http://localhost:3000"
call npm run dev
pause
