@echo off
cd /d "%~dp0"
echo Study Buddy - Starting...
if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)
echo Starting dev server...
echo.
echo Browser will open in ~4s, or visit: http://localhost:3000
echo.
start /B cmd /c "timeout /t 4 /nobreak > nul && start http://localhost:3000"
call npm run dev
pause
