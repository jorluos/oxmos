@echo off
title Oxmos Project Starter
echo ==========================================
echo   INICIANDO PROYECTO ECOMMERCE OXMOS
echo ==========================================
echo.

echo 1. Iniciando Backend Laravel en http://localhost:8000 ...
start "Backend - Laravel Serve" cmd /k "cd backend && php artisan serve"

echo 2. Iniciando Frontend Vite en http://localhost:5173 ...
start "Frontend - Vite Dev" cmd /k "npm run dev"

echo.
echo ==========================================
echo   Listo! Los servidores se estan ejecutando.
echo   Abre http://localhost:5173 en tu navegador.
echo ==========================================
echo.
pause
