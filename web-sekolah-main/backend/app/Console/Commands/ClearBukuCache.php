<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\Api\BukuController;

/**
 * PERBAIKAN ESENSIAL #5: Artisan Command untuk Cache Invalidation
 *
 * Masalah: categories() dibungkus Cache::remember(3600) — tanpa tool
 * untuk membersihkan cache, perubahan data buku tidak akan langsung
 * terlihat sampai cache kadaluarsa (1 jam).
 *
 * Solusi: Command ini bisa dipanggil:
 * - Manual: `php artisan buku:clear-cache`
 * - Otomatis: Tambahkan ke pipeline setelah import/sinkronisasi data SLiMS
 * - Terjadwal: Di Kernel.php jika diperlukan
 */
class ClearBukuCache extends Command
{
    /**
     * Nama dan signature command.
     * Opsi --all: hapus semua cache terkait buku (untuk kebutuhan masa depan).
     */
    protected $signature = 'buku:clear-cache
                            {--all : Hapus semua cache terkait buku, tidak hanya kategori}';

    protected $description = 'Bersihkan cache buku (kategori hierarki). Jalankan setelah import/update data dari SLiMS.';

    public function handle(): int
    {
        $this->info('🗑️  Membersihkan cache PresmaLib...');

        // Hapus cache kategori hierarki
        $removed = Cache::forget(BukuController::CACHE_KEY_CATEGORIES);

        if ($removed) {
            $this->info('  ✅ Cache kategori berhasil dihapus.');
        } else {
            $this->warn('  ⚠️  Cache kategori tidak ditemukan (sudah bersih atau belum pernah di-generate).');
        }

        if ($this->option('all')) {
            // Placeholder untuk cache keys tambahan di masa depan
            // Contoh: Cache::forget('buku_popular'), Cache::forget('buku_new'), dst.
            $this->info('  ℹ️  --all: tidak ada cache tambahan untuk dihapus saat ini.');
        }

        $this->newLine();
        $this->info('✨ Cache berhasil dibersihkan. Kategori akan di-generate ulang pada request berikutnya.');

        return Command::SUCCESS;
    }
}
