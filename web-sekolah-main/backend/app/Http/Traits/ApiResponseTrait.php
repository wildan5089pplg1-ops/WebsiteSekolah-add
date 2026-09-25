<?php

namespace App\Http\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

/**
 * ApiResponseTrait
 *
 * Menyediakan format respons API yang seragam di seluruh controller.
 * Standar format:
 *
 * Sukses:
 *   { "success": true,  "data": {...|[...]}, "message": "..." }
 *
 * Paginasi:
 *   { "success": true, "data": { "items": [...], "meta": { pagination info } } }
 *
 * Error:
 *   { "success": false, "message": "...", "errors": {...} }
 *
 * Mengapa ini penting:
 * - Frontend developer punya kontrak respons yang konsisten dan bisa diandalkan
 * - Error handling di frontend menjadi seragam (selalu cek `success`)
 * - Dokumentasi API (Swagger/Postman) mudah dibuat
 * - Mudah di-extend jika butuh field tambahan (meta, links, dll)
 */
trait ApiResponseTrait
{
    /**
     * Respons sukses standar.
     *
     * @param mixed       $data    Data yang dikembalikan
     * @param string      $message Pesan sukses (opsional)
     * @param int         $status  HTTP status code (default 200)
     * @param array       $headers HTTP headers tambahan
     */
    protected function successResponse(
        mixed $data,
        string $message = 'OK',
        int $status = 200,
        array $headers = []
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $data,
        ], $status)->withHeaders($headers);
    }

    /**
     * Respons sukses untuk data paginasi.
     * Memisahkan items dari metadata paginasi agar lebih rapi.
     *
     * Output:
     * {
     *   "success": true,
     *   "message": "OK",
     *   "data": [...items...],
     *   "meta": {
     *     "current_page": 1,
     *     "last_page": 5,
     *     "per_page": 18,
     *     "total": 90,
     *     "from": 1,
     *     "to": 18
     *   }
     * }
     */
    protected function paginatedResponse(
        LengthAwarePaginator $paginator,
        string $message = 'OK',
        array $headers = []
    ): JsonResponse {
        return response()->json([
            'success' => true,
            'message' => $message,
            'data'    => $paginator->items(),
            'meta'    => [
                'current_page' => $paginator->currentPage(),
                'last_page'    => $paginator->lastPage(),
                'per_page'     => $paginator->perPage(),
                'total'        => $paginator->total(),
                'from'         => $paginator->firstItem(),
                'to'           => $paginator->lastItem(),
            ],
        ])->withHeaders($headers);
    }

    /**
     * Respons error standar.
     *
     * @param string     $message Pesan error yang user-friendly
     * @param int        $status  HTTP status code
     * @param array|null $errors  Detail error (misal: validation errors)
     */
    protected function errorResponse(
        string $message,
        int $status = 400,
        ?array $errors = null
    ): JsonResponse {
        $body = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors !== null) {
            $body['errors'] = $errors;
        }

        return response()->json($body, $status);
    }

    /**
     * Shorthand untuk 404 Not Found.
     */
    protected function notFoundResponse(string $message = 'Data tidak ditemukan'): JsonResponse
    {
        return $this->errorResponse($message, 404);
    }

    /**
     * Shorthand untuk 422 Unprocessable Entity.
     */
    protected function invalidResponse(string $message = 'Input tidak valid'): JsonResponse
    {
        return $this->errorResponse($message, 422);
    }
}
