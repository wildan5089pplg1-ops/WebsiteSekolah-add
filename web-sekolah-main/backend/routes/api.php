<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PpdbController;
use App\Http\Controllers\Api\BukuController;
use App\Http\Controllers\Api\KelasPelatihanController;
use App\Http\Controllers\Api\AuthController;

Route::prefix('v1')->group(function () {

    // =====================================================================
    // Public Routes (Tanpa Autentikasi)
    // =====================================================================
    Route::post('/login', [AuthController::class, 'login']);
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

    Route::get('/ppdb', [PpdbController::class, 'index']);
    Route::post('/ppdb', [PpdbController::class, 'store']);

    Route::get('/buku', [BukuController::class, 'index']);
    Route::get('/buku/kategori', [BukuController::class, 'categories']);
    Route::get('/buku/{id}', [BukuController::class, 'show']);

    Route::get('/kelas-pelatihan', [KelasPelatihanController::class, 'index']);

    // =====================================================================
    // Protected Admin Routes (Token via 'admin.token' Middleware)
    // =====================================================================
    Route::middleware('admin.token')->group(function () {
        // Presma Career (Kelas)
        Route::post('/kelas-pelatihan', [KelasPelatihanController::class, 'store']);
        Route::put('/kelas-pelatihan/{id}', [KelasPelatihanController::class, 'update']);
        Route::delete('/kelas-pelatihan/{id}', [KelasPelatihanController::class, 'destroy']);

        // Presma Lib (Buku)
        Route::post('/buku', [BukuController::class, 'store']);
        Route::put('/buku/{id}', [BukuController::class, 'update']);
        Route::delete('/buku/{id}', [BukuController::class, 'destroy']);

        // Contacts
        Route::get('/contact', [ContactController::class, 'index']);
        Route::delete('/contact/{id}', [ContactController::class, 'destroy']);
    });

});
