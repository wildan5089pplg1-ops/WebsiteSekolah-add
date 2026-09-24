<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BukuSlims;
use Illuminate\Http\Request;

class BukuController extends Controller
{
    // Kolom yang ditampilkan di grid dan detail cepat
    private const GRID_COLUMNS = [
        'id', 'judul', 'pengarang', 'nama_file_cover',
        'penerbit', 'tahun_terbit', 'subjek_kategori',
        'deskripsi_abstrak', 'isbn_issn',
    ];

    // Kolom lengkap untuk halaman detail
    private const DETAIL_COLUMNS = [
        'id', 'judul', 'pengarang', 'nama_file_cover',
        'penerbit', 'tahun_terbit', 'isbn_issn',
        'deskripsi_abstrak', 'bahasa', 'tempat_terbit',
        'klasifikasi', 'no_panggil', 'subjek_kategori', 'gmd',
    ];

    public function index(Request $request)
    {
        $query = BukuSlims::select(self::GRID_COLUMNS)
            ->whereNotNull('judul')
            ->where('judul', '!=', '')
            ->whereIn('id', function ($sub) {
                $sub->selectRaw('MIN(id)')
                    ->from('buku_slims')
                    ->whereNotNull('judul')
                    ->where('judul', '!=', '')
                    ->groupBy('judul');
            })
            ->orderBy('judul', 'asc');

        // Gunakan filled() bukan has() agar string kosong "" tidak memicu query search
        if ($request->filled('search')) {
            $search = $request->input('search');

            // Gunakan where(function) agar grouping benar:
            // WHERE (judul LIKE '%x%' OR pengarang LIKE '%x%')
            $query->where(function ($q) use ($search) {
                $q->where('judul', 'like', "%{$search}%")
                  ->orWhere('pengarang', 'like', "%{$search}%");
            });
        }

        // Filter berdasarkan kategori dari subjek_kategori
        if ($request->filled('category')) {
            $category = $request->input('category');
            $query->where(function ($q) use ($category) {
                $q->where('subjek_kategori', 'like', "%<{$category}>%")
                  ->orWhere('subjek_kategori', 'like', "%{$category}%");
            });
        }

        $buku = $query->paginate(18);

        return response()->json($buku);
    }

    public function categories()
    {
        $raw = BukuSlims::whereNotNull('subjek_kategori')
            ->where('subjek_kategori', '!=', '')
            ->pluck('subjek_kategori');

        $cats = [];
        foreach ($raw as $r) {
            preg_match_all('/<([^>]+)>/', $r, $matches);
            if (!empty($matches[1])) {
                foreach ($matches[1] as $c) {
                    $c = trim($c);
                    // Filter tag yang valid (panjang > 2)
                    if (!empty($c) && strlen($c) > 2) {
                        $cats[$c] = ($cats[$c] ?? 0) + 1;
                    }
                }
            }
        }

        arsort($cats);

        $result = [];
        foreach ($cats as $name => $count) {
            $result[] = [
                'name' => $name,
                'count' => $count,
            ];
        }

        return response()->json($result);
    }

    public function show($id)
    {
        // Ambil hanya kolom yang diperlukan untuk halaman detail
        $buku = BukuSlims::select(self::DETAIL_COLUMNS)->find($id);

        if (!$buku) {
            return response()->json(['message' => 'Buku tidak ditemukan'], 404);
        }

        return response()->json($buku);
    }
}
