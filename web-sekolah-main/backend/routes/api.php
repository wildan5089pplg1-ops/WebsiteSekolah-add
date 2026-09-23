<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\FacilityController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\PpdbController;
use App\Http\Controllers\Api\BukuController;

Route::prefix('v1')->group(function () {

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
    Route::get('/buku/{id}', [BukuController::class, 'show']);

});
