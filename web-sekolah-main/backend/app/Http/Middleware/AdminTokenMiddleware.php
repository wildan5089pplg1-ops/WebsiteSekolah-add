<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;

class AdminTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $authHeader = $request->header('Authorization', '');
        $token = str_replace('Bearer ', '', $authHeader);

        if (!$token || !User::where('remember_token', $token)->exists()) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized. Token tidak valid atau tidak ditemukan.',
            ], 401);
        }

        return $next($request);
    }
}
