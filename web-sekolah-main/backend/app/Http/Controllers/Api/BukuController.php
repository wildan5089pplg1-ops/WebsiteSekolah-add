<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Traits\ApiResponseTrait;
use App\Models\BukuSlims;
use App\Services\BukuCategoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

/**
 * BukuController
 *
 * Mengelola endpoint API untuk katalog buku PresmaLib.
 * Mengikuti prinsip Thin Controller: validasi → delegasi ke service → kembalikan response.
 *
 * Standar yang diterapkan:
 * - Input validation di semua endpoint
 * - Format response seragam via ApiResponseTrait
 * - Logika bisnis di BukuCategoryService (bukan di Controller)
 * - Cache server-side + HTTP Cache-Control headers
 * - FULLTEXT search (bukan LIKE '%x%')
 */
class BukuController extends Controller
{
    use ApiResponseTrait;

    /**
     * Kolom untuk tampilan grid/kartu buku.
     * deskripsi_abstrak tidak disertakan — kolom TEXT panjang yang hanya
     * ditampilkan di detail view, bukan di grid.
     */
    private const GRID_COLUMNS = [
        'id', 'judul', 'pengarang', 'nama_file_cover',
        'penerbit', 'tahun_terbit', 'isbn_issn',
    ];

    private const DETAIL_COLUMNS = [
        'id', 'judul', 'pengarang', 'nama_file_cover',
        'penerbit', 'tahun_terbit', 'isbn_issn',
        'deskripsi_abstrak', 'bahasa', 'tempat_terbit',
        'klasifikasi', 'no_panggil', 'subjek_kategori', 'gmd',
    ];

    /** Cache key publik — dipakai oleh `php artisan buku:clear-cache`. */
    public const CACHE_KEY_CATEGORIES = 'buku_categories_v2';

    public function __construct(
        private readonly BukuCategoryService $categoryService
    ) {}

    // =========================================================================
    // PUBLIC ENDPOINTS
    // =========================================================================

    /**
     * GET /api/v1/buku
     *
     * Daftar buku dengan paginasi, pencarian FULLTEXT, dan filter kategori.
     *
     * Response format:
     * {
     *   "success": true,
     *   "data": [...books...],
     *   "meta": { "current_page": 1, "last_page": 5, "total": 90, ... }
     * }
     */
    public function index(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'search'   => ['sometimes', 'string', 'max:100'],
            'category' => ['sometimes', 'string', 'max:150'],
            'page'     => ['sometimes', 'integer', 'min:1'],
        ]);

        $query = BukuSlims::select(array_map(fn($col) => "buku_slims.{$col}", self::GRID_COLUMNS))
            ->joinSub($this->deduplicateJoin(), 'dedup', 'buku_slims.id', '=', 'dedup.min_id')
            ->orderBy('buku_slims.judul', 'asc');

        if (!empty($validated['search'])) {
            $query->searchText($validated['search']);
        }

        if (!empty($validated['category'])) {
            $query->filterByCategory($validated['category']);
        }

        $paginator = $query->paginate(config('presmalib.per_page', 18));

        return $this->paginatedResponse($paginator, 'OK', $this->cacheHeaders(60));
    }

    /**
     * GET /api/v1/buku/kategori
     *
     * Daftar kategori hierarkis. Server-side cache 1 jam.
     *
     * Response format:
     * {
     *   "success": true,
     *   "data": [ { "name": "Fiksi & Novel", "count": 52, "children": [...] }, ... ]
     * }
     */
    public function categories(): JsonResponse
    {
        $cacheKey = config('presmalib.cache.categories_key', self::CACHE_KEY_CATEGORIES);
        $cacheTtl = config('presmalib.cache.categories_ttl', 3600);

        $data = Cache::remember($cacheKey, $cacheTtl, function () {
            $raw = DB::table('buku_slims')
                ->select('buku_slims.subjek_kategori')
                ->joinSub($this->deduplicateJoin(), 'dedup', 'buku_slims.id', '=', 'dedup.min_id')
                ->whereNotNull('buku_slims.subjek_kategori')
                ->where('buku_slims.subjek_kategori', '!=', '')
                ->pluck('buku_slims.subjek_kategori')
                ->all();

            // Delegasi ke Service — Controller tidak lagi tahu detail logika
            return $this->categoryService->buildHierarchy($raw);
        });

        return $this->successResponse($data, 'OK', 200, $this->cacheHeaders(300));
    }

    /**
     * GET /api/v1/buku/{id}
     *
     * Detail satu buku. Lookup by PRIMARY KEY (O(log n)).
     *
     * Response format:
     * { "success": true, "data": { ...book fields... } }
     */
    public function show(int $id): JsonResponse
    {
        if ($id <= 0) {
            return $this->invalidResponse('ID buku tidak valid.');
        }

        $buku = BukuSlims::select(self::DETAIL_COLUMNS)->find($id);

        if (!$buku) {
            return $this->notFoundResponse('Buku tidak ditemukan.');
        }

        return $this->successResponse($buku, 'OK', 200, $this->cacheHeaders(300));
    }

    // =========================================================================
    // PRIVATE HELPERS
    // =========================================================================

    /**
     * Subquery JOIN untuk deduplikasi judul: ambil MIN(id) per judul unik.
     * Dipakai bersama oleh index() dan categories() agar konsisten.
     */
    private function deduplicateJoin(): \Illuminate\Database\Query\Builder
    {
        return DB::table('buku_slims as dedup')
            ->selectRaw('MIN(dedup.id) as min_id')
            ->whereNotNull('dedup.judul')
            ->where('dedup.judul', '!=', '')
            ->groupBy('dedup.judul');
    }

    /**
     * HTTP Cache-Control headers untuk response publik (read-only).
     *
     * @param int $seconds Durasi max-age cache dalam detik
     */
    private function cacheHeaders(int $seconds): array
    {
        return [
            'Cache-Control' => "public, max-age={$seconds}, stale-while-revalidate=60",
            'Vary'          => 'Accept-Encoding',
        ];
    }
}
