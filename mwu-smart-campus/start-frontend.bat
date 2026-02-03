@echo off
cd frontend

echo [1/3] Installing NPM Dependencies...
call npm install

if not exist .env.local (
    echo [2/3] Creating environment file...
    copy .env.local.example .env.local
) else (
    echo .env.local already exists, skipping...
)

echo [3/3] Starting Frontend Dev Server...
call npm run dev
pause
