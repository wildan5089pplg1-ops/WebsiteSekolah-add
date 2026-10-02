@echo off
title Launcher Website Sekolah

echo ========================================================
echo Memulai Lingkungan Pengembangan Website Sekolah
echo ========================================================
echo.

echo [1] Menjalankan Server Backend Laravel...
:: Membuka jendela terminal baru untuk backend
start "Backend - Laravel (Port 8000)" cmd /k "cd backend && php artisan serve"

:: Memberi jeda 2 detik agar backend bersiap (opsional)
timeout /t 2 >nul

echo [2] Menjalankan Server Frontend Next.js...
:: Membuka jendela terminal baru untuk frontend
start "Frontend - Next.js (Port 3000)" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================================
echo SUKSES! Server telah diluncurkan di jendela terpisah.
echo.
echo - Backend (API) bisa diakses di : http://localhost:8000
echo - Frontend (Web) bisa diakses di: http://localhost:3000
echo ========================================================
echo.
echo Catatan: 
echo - Pastikan MySQL (XAMPP) sudah Anda nyalakan.
echo - Biarkan 2 jendela terminal yang baru terbuka. 
echo - Jika ingin mematikan server, tutup kedua jendela tersebut.
echo.
pause
