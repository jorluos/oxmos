@echo off
title Oxmos Project Starter
echo ==========================================
echo   INICIANDO PROYECTO ECOMMERCE OXMOS
echo ==========================================
echo.

:: 1. Verificacion de dependencias del Backend
if not exist "backend\vendor" (
    echo [Backend] Carpeta vendor no encontrada. Ejecutando composer install...
    cd backend && call composer install && cd ..
)

:: 2. Verificacion del archivo .env del Backend
if not exist "backend\.env" (
    echo [Backend] Archivo .env no encontrado. Creando desde .env.example...
    copy backend\.env.example backend\.env
    cd backend && call php artisan key:generate && cd ..
)

:: 3. Verificacion de base de datos SQLite
if not exist "backend\database\database.sqlite" (
    echo [Backend] Base de datos no encontrada. Creando y ejecutando migraciones...
    type nul > backend\database\database.sqlite
    cd backend && call php artisan migrate:fresh --seed && cd ..
)

:: 4. Verificacion de dependencias del Frontend
if not exist "frontend\node_modules" (
    echo [Frontend] node_modules no encontrado. Ejecutando npm install...
    cd frontend && call npm install && cd ..
)

echo.
echo 1. Iniciando Backend Laravel en http://localhost:8000 ...
start "Backend - Laravel Serve" cmd /k "cd backend && php artisan serve"

echo 2. Iniciando Frontend Vite en http://localhost:5173 ...
start "Frontend - Vite Dev" cmd /k "cd frontend && npm run dev"

echo.
echo ==========================================
echo   Listo! Los servidores se estan ejecutando.
echo   Abre http://localhost:5173 en tu navegador.
echo ==========================================
echo.
pause
