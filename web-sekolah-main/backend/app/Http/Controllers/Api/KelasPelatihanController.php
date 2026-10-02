<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KelasPelatihan;
use App\Http\Traits\ApiResponseTrait;
use App\Services\KelasPelatihanService;

class KelasPelatihanController extends Controller
{
    use ApiResponseTrait;

    protected $kelasService;

    public function __construct(KelasPelatihanService $kelasService)
    {
        $this->kelasService = $kelasService;
    }

    /**
     * GET: Ambil daftar kelas pelatihan
     */
    public function index(Request $request)
    {
        $request->validate([
            'per_page' => 'sometimes|integer|min:1|max:100',
            'page'     => 'sometimes|integer|min:1'
        ]);

        $tipe    = $request->input('tipe', 'Semua');
        $search  = $request->input('search', '');
        $page    = (int) $request->input('page', 1);
        $perPage = (int) $request->input('per_page', 50);

        $kelas = $this->kelasService->getKelasList($tipe, $search, $page, $perPage);

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

        $kelas = $this->kelasService->createKelas($validated);

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

        $this->kelasService->updateKelas($kelas, $validated);

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

        $this->kelasService->deleteKelas($kelas);

        return $this->successResponse(null, 'Kelas pelatihan berhasil dihapus');
    }
}
