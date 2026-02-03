@echo off
cd backend

echo [1/5] Installing Composer Dependencies...
call composer install

if not exist .env (
    echo [2/5] Creating .env file...
    copy .env.example .env
    echo [3/5] Generating Application Key...
    call php artisan key:generate
) else (
    echo .env already exists, skipping creation...
)

echo [4/5] Running Migrations and Seeds...
echo (Ensure your Database 'mwu_smart_campus' exists in MySQL!)
call php artisan migrate --seed

echo [5/5] Starting Backend Server...
call php artisan serve
pause
