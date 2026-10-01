<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\RateLimiter;
use App\Http\Traits\ApiResponseTrait;

class AuthController extends Controller
{
    use ApiResponseTrait;

    public function login(Request $request)
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required',
        ]);

        // CRITICAL FIX 1: Implementasi Anti Brute-force (Maks 5 percobaan per menit per IP)
        $throttleKey = 'login_attempts:' . $request->ip();

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {
            $seconds = RateLimiter::availableIn($throttleKey);
            return $this->errorResponse("Terlalu banyak percobaan login. Silakan coba lagi dalam {$seconds} detik.", 429);
        }

        if (Auth::attempt($request->only('email', 'password'))) {
            RateLimiter::clear($throttleKey); // Reset percobaan jika berhasil

            $user = Auth::user();
            $token = bin2hex(random_bytes(40));
            
            // Note: Masih menggunakan pendekatan Single-Session untuk kompatibilitas DB saat ini
            $user->remember_token = hash('sha256', $token);
            $user->save();

            return $this->successResponse([
                'user'  => $user,
                'token' => $token,
            ], 'Login berhasil');
        }

        // Catat kegagalan untuk membatasi Brute-Force
        RateLimiter::hit($throttleKey, 60);

        return $this->errorResponse('Email atau password salah', 401);
    }

    public function logout(Request $request)
    {
        // MEDIUM FIX: Manfaatkan request bearerToken alih-alih hardcode parsing string
        $token = $request->bearerToken();
        
        if ($token) {
            // Karena ini Bearer token stateless manual, kita harus menghapusnya dari database.
            // Metode standar Laravel yang efisien tanpa narik object ke memory.
            \App\Models\User::where('remember_token', hash('sha256', $token))->update([
                'remember_token' => null
            ]);
        }
        
        return $this->successResponse(null, 'Logout berhasil');
    }
}
