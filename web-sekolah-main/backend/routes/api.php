<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PpdbController;
use App\Http\Controllers\Api\BukuController;
use App\Http\Controllers\Api\KelasPelatihanController;
use App\Http\Controllers\Api\KarirController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;

Route::prefix('v1')->group(function () {

    // =====================================================================
    // Public Routes (Tanpa Autentikasi)
    // =====================================================================
    Route::middleware('throttle:5,1')->post('/login', [AuthController::class, 'login']);
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'service' => 'Laravel School Backend API',
        ]);
    });

    Route::get('/school-info', function () {
        return response()->json([
            'success' => true,
            'data' => [
                'name' => 'SMA Negeri 1 Antigravity',
                'tagline' => 'Mewujudkan Generasi Unggul, Berkarakter, dan Berdaya Saing Global',
                'description' => 'SMA Negeri 1 Antigravity adalah sekolah unggulan yang berkomitmen menyediakan pendidikan berkualitas tinggi berbasis teknologi dan nilai-nilai luhur bangsa.',
                'accreditation' => 'A (Sangat Baik)',
                'principal' => 'Dr. H. Ahmad Fauzi, M.Pd.',
                'address' => 'Jl. Pendidikan No. 45, Jakarta Selatan',
                'phone' => '(021) 7890-1234',
                'email' => 'info@sman1antigravity.sch.id',
                'stats' => [
                    'students' => 1250,
                    'teachers' => 85,
                    'extracurriculars' => 24,
                    'graduatesRate' => '98.5%'
                ]
            ]
        ]);
    });

    Route::get('/news', [NewsController::class, 'index']);
    Route::get('/news/{id}', [NewsController::class, 'show']);

    Route::get('/facilities', [FacilityController::class, 'index']);

    Route::post('/contact', [ContactController::class, 'store']);

    Route::post('/ppdb', [PpdbController::class, 'store']);

    Route::get('/buku', [BukuController::class, 'index']);
    Route::get('/buku/kategori', [BukuController::class, 'categories']);
    Route::get('/buku/{id}', [BukuController::class, 'show']);

    Route::get('/kelas-pelatihan', [KelasPelatihanController::class, 'index']);
    Route::get('/karir', [KarirController::class, 'index']);

    // =====================================================================
    // Protected Admin Routes (Token via 'admin.token' Middleware)
    // =====================================================================
    // =====================================================================
    Route::middleware('admin.token')->group(function () {
        // Dashboard Stats
        Route::get('/dashboard/stats', [DashboardController::class, 'stats']);

        // Berita
        Route::post('/news', [\App\Http\Controllers\Api\NewsController::class, 'store']);
        Route::put('/news/{id}', [\App\Http\Controllers\Api\NewsController::class, 'update']);
        Route::delete('/news/{id}', [\App\Http\Controllers\Api\NewsController::class, 'destroy']);

        // Presma Career (Kelas)
        Route::post('/kelas-pelatihan', [KelasPelatihanController::class, 'store']);
        Route::put('/kelas-pelatihan/{id}', [KelasPelatihanController::class, 'update']);
        Route::delete('/kelas-pelatihan/{id}', [KelasPelatihanController::class, 'destroy']);

        // Presma Career (Karir)
        Route::post('/karir', [KarirController::class, 'store']);
        Route::put('/karir/{id}', [KarirController::class, 'update']);
        Route::delete('/karir/{id}', [KarirController::class, 'destroy']);

        // Presma Lib (Buku)
        Route::post('/buku', [BukuController::class, 'store']);
        Route::put('/buku/{id}', [BukuController::class, 'update']);
        Route::delete('/buku/{id}', [BukuController::class, 'destroy']);

        // Contacts
        Route::get('/contact', [ContactController::class, 'index']);
        Route::delete('/contact/{id}', [ContactController::class, 'destroy']);

        // PPDB
        Route::get('/ppdb', [PpdbController::class, 'index']);
        Route::put('/ppdb/{id}', [PpdbController::class, 'update']);
        Route::delete('/ppdb/{id}', [PpdbController::class, 'destroy']);
    });

});
