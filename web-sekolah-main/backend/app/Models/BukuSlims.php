<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * Model BukuSlims
 *
 * PERBAIKAN ESENSIAL #3: Perkuat Model dengan:
 * - $fillable: Lindungi dari mass assignment vulnerability
 * - $casts: Otomatis cast tipe data → tidak perlu cast manual di controller
 * - Query Scopes: Enkapsulasi logika filtering yang berulang
 *
 * @property int         $id
 * @property string|null $judul
 * @property string|null $pengarang
 * @property string|null $isbn_issn
 * @property string|null $penerbit
 * @property int|null    $tahun_terbit     ← sekarang integer setelah migrasi
 * @property string|null $edisi
 * @property string|null $gmd
 * @property string|null $no_panggil
 * @property string|null $klasifikasi
 * @property string|null $bahasa
 * @property string|null $tempat_terbit
 * @property string|null $judul_seri
 * @property string|null $subjek_kategori
 * @property string|null $deskripsi_fisik
 * @property string|null $deskripsi_abstrak
 * @property string|null $nama_file_cover
 * @property string|null $barcode_item
 */
class BukuSlims extends Model
{
    protected $table      = 'buku_slims';
    public    $timestamps = false; // SLiMS tidak menggunakan created_at/updated_at

    /**
     * Kolom yang boleh diisi via create() / update() / fill().
     * Sebelumnya $guarded = [] membiarkan SEMUA kolom bisa diisi
     * termasuk id dan kolom sensitif lainnya — risiko mass assignment.
     */
    protected $fillable = [
        'judul',
        'pengarang',
        'isbn_issn',
        'penerbit',
        'tahun_terbit',
        'edisi',
        'gmd',
        'no_panggil',
        'klasifikasi',
        'bahasa',
        'tempat_terbit',
        'judul_seri',
        'subjek_kategori',
        'deskripsi_fisik',
        'deskripsi_abstrak',
        'nama_file_cover',
        'barcode_item',
    ];

    /**
     * Konversi tipe data otomatis.
     * Setelah migrasi fix_tahun_terbit, kolom tahun_terbit kini SMALLINT.
     * Cast 'integer' memastikan nilai selalu dikembalikan sebagai PHP int,
     * bukan string — mencegah bug perbandingan tipe (e.g. "2020" !== 2020).
     */
    protected $casts = [
        'tahun_terbit' => 'integer',
    ];

    // =========================================================================
    // QUERY SCOPES
    // Enkapsulasi logika query yang sering dipakai di controller.
    // Mencegah duplikasi kode dan memudahkan testing.
    // =========================================================================

    /**
     * Scope: Hanya buku dengan judul valid (tidak NULL dan tidak kosong).
     * Dipakai di hampir semua query — ini mencegah buku "rusak" tampil.
     *
     * Penggunaan: BukuSlims::withValidTitle()->...
     */
    public function scopeWithValidTitle(Builder $query): Builder
    {
        return $query->whereNotNull('judul')->where('judul', '!=', '');
    }

    /**
     * Scope: Deduplikasi buku berdasarkan judul (ambil ID terendah per judul).
     * Ini menggantikan logika GROUP BY yang sering diulang di controller.
     *
     * Penggunaan: BukuSlims::uniqueByTitle()->...
     */
    public function scopeUniqueByTitle(Builder $query): Builder
    {
        return $query->withValidTitle()
            ->whereIn('id', function ($sub) {
                $sub->selectRaw('MIN(id)')
                    ->from('buku_slims')
                    ->whereNotNull('judul')
                    ->where('judul', '!=', '')
                    ->groupBy('judul');
            });
    }

    /**
     * Scope: Filter pencarian teks bebas menggunakan FULLTEXT index.
     * Menggunakan MATCH...AGAINST mode BOOLEAN dengan trailing * untuk
     * partial word matching (misal: "java" cocok "javascript").
     *
     * Penggunaan: BukuSlims::searchText('atomic habits')->...
     */
    public function scopeSearchText(Builder $query, string $search): Builder
    {
        return $query->whereRaw(
            'MATCH(buku_slims.judul, buku_slims.pengarang) AGAINST(? IN BOOLEAN MODE)',
            ["{$search}*"]
        );
    }

    /**
     * Scope: Filter berdasarkan kategori (dari format XML-tag SLiMS).
     *
     * Penggunaan: BukuSlims::filterByCategory('Novel')->...
     */
    public function scopeFilterByCategory(Builder $query, string $category): Builder
    {
        return $query->where(function ($q) use ($category) {
            $q->where('buku_slims.subjek_kategori', 'like', "%<{$category}>%")
              ->orWhere('buku_slims.subjek_kategori', 'like', "%{$category}%");
        });
    }

    /**
     * Scope: Filter berdasarkan rentang tahun terbit.
     * Ini sekarang bisa efisien setelah tahun_terbit dikonversi ke SMALLINT.
     *
     * Penggunaan: BukuSlims::publishedBetween(2010, 2023)->...
     */
    public function scopePublishedBetween(Builder $query, int $from, int $to): Builder
    {
        return $query->whereBetween('tahun_terbit', [$from, $to]);
    }

    // =========================================================================
    // HELPER METHODS
    // =========================================================================

    /**
     * Pecah string subjek_kategori format SLiMS (<Tag1><Tag2>)
     * menjadi array PHP yang bersih.
     *
     * Penggunaan: $buku->getCategories() → ['Novel', 'Fiksi Remaja']
     */
    public function getCategories(): array
    {
        if (empty($this->subjek_kategori)) {
            return [];
        }

        preg_match_all('/<([^>]+)>/', $this->subjek_kategori, $matches);

        return array_values(array_filter(
            array_map('trim', $matches[1] ?? []),
            fn($c) => strlen($c) > 2
        ));
    }

    /**
     * Dapatkan URL cover buku.
     * Urutan prioritas: backend upload → OpenLibrary ISBN → null
     *
     * URL backend diambil dari config('presmalib.cover.base_url') yang membaca
     * APP_URL dari .env — tidak hardcode localhost agar bekerja di production.
     */
    public function getCoverUrl(string $size = 'M'): ?string
    {
        if ($this->nama_file_cover) {
            $baseUrl = rtrim(config('presmalib.cover.base_url', url('/images/docs/')), '/');
            return "{$baseUrl}/{$this->nama_file_cover}";
        }

        if ($this->isbn_issn) {
            $clean = preg_replace('/[^0-9X]/i', '', $this->isbn_issn);
            if (strlen($clean) >= 9) {
                return "https://covers.openlibrary.org/b/isbn/{$clean}-{$size}.jpg";
            }
        }

        return null;
    }
}
