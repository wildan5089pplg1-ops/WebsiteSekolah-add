<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Traits\ApiResponseTrait;

class AuthController extends Controller
{
    use ApiResponseTrait;

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($request->only('email', 'password'))) {
            $user = Auth::user();
            $token = bin2hex(random_bytes(40));
            $user->remember_token = $token;
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Login berhasil',
                'data' => [
                    'user' => $user,
                    'token' => $token,
                ]
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Email atau password salah',
        ], 401);
    }

    public function logout(Request $request)
    {
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
        if ($token) {
            $user = \App\Models\User::where('remember_token', $token)->first();
            if ($user) {
                $user->remember_token = null;
                $user->save();
            }
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Logout berhasil',
        ]);
    }
}
