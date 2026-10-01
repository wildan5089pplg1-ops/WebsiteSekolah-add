<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Http\JsonResponse;

class AdminTokenMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if ($token === null || $token === '') {
            return $this->unauthorizedResponse();
        }
        $admin = User::where('remember_token', hash('sha256', $token))->first();

        if (!$admin) {
            return $this->unauthorizedResponse();
        }

        Auth::setUser($admin);

        return $next($request);
    }

    private function unauthorizedResponse(): JsonResponse
    {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized. Token API tidak valid atau tidak ditemukan.',
        ], 401);
    }
}
