<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KelasPelatihan;
use App\Http\Traits\ApiResponseTrait;
use Illuminate\Support\Facades\Cache;

class KelasPelatihanController extends Controller
{
    use ApiResponseTrait;

    /**
     * GET: Ambil daftar kelas pelatihan (dengan cache & optimasi query)
     */
    public function index(Request $request)
    {
        $tipe    = $request->input('tipe', 'Semua');
        $search  = $request->input('search', '');
        $page    = $request->input('page', 1);
        $perPage = (int) $request->input('per_page', 50);

        $version = Cache::get('kelas_pelatihan_version', 1);
        $cacheKey = "kelas_pel_v{$version}_{$tipe}_" . md5($search) . "_page_{$page}";

        $kelas = Cache::remember($cacheKey, now()->addMinutes(60), function () use ($tipe, $search, $perPage) {
            $query = KelasPelatihan::select('id', 'judul', 'deskripsi', 'tipe', 'link', 'biaya');

            if ($tipe !== 'Semua') {
                $query->where('tipe', $tipe);
            }

            if (!empty($search)) {
                $query->whereFullText(['judul', 'deskripsi'], $search);
            }

            return $query->orderBy('id', 'asc')->paginate($perPage);
        });

        return response()->json([
            'success' => true,
            'message' => 'Berhasil mengambil daftar kelas & pelatihan',
            'data'    => $kelas->items(),
            'meta'    => [
                'current_page' => $kelas->currentPage(),
                'last_page'    => $kelas->lastPage(),
                'total'        => $kelas->total(),
                'per_page'     => $kelas->perPage(),
            ]
        ])->setSharedMaxAge(3600);
    }

    /**
     * POST: Tambah kelas pelatihan baru
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'judul'    => 'required|string|max:255',
            'deskripsi' => 'required|string',
            'tipe'     => 'required|in:PPLG,TJKT,DKV,BCF,Karir',
            'link'     => 'required|url',
            'biaya'    => 'required|in:Gratis,Biaya tertera',
        ]);

        $kelas = KelasPelatihan::create($validated);
        $this->clearKelasCache();

        return $this->successResponse($kelas, 'Kelas pelatihan berhasil ditambahkan', 201);
    }

    /**
     * PUT: Perbarui kelas pelatihan
     */
    public function update(Request $request, $id)
    {
        $kelas = KelasPelatihan::find($id);
        if (!$kelas) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $validated = $request->validate([
            'judul'    => 'sometimes|required|string|max:255',
            'deskripsi' => 'sometimes|required|string',
            'tipe'     => 'sometimes|required|in:PPLG,TJKT,DKV,BCF,Karir',
            'link'     => 'sometimes|required|url',
            'biaya'    => 'sometimes|required|in:Gratis,Biaya tertera',
        ]);

        $kelas->update($validated);
        $this->clearKelasCache();

        return $this->successResponse($kelas, 'Kelas pelatihan berhasil diperbarui');
    }

    /**
     * DELETE: Hapus kelas pelatihan
     */
    public function destroy($id)
    {
        $kelas = KelasPelatihan::find($id);
        if (!$kelas) {
            return response()->json(['success' => false, 'message' => 'Data tidak ditemukan'], 404);
        }

        $kelas->delete();
        $this->clearKelasCache();

        return $this->successResponse(null, 'Kelas pelatihan berhasil dihapus');
    }

    /**
     * Helper: Hapus/invalidasi hanya cache yang berkaitan dengan kelas pelatihan
     * menggunakan teknik Cache Versioning tanpa mengganggu cache global (Cache::flush)
     */
    private function clearKelasCache(): void
    {
        // Jika belum ada di cache, kita set ke 2 karena default get adalah 1
        if (!Cache::has('kelas_pelatihan_version')) {
            Cache::put('kelas_pelatihan_version', 2);
        } else {
            Cache::increment('kelas_pelatihan_version');
        }
    }
}
