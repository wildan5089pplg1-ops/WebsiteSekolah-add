<?php

namespace App\Services;

use App\Models\KelasPelatihan;
use Illuminate\Support\Facades\Cache;

class KelasPelatihanService
{
    /**
     * Ambil daftar kelas pelatihan (dengan cache & optimasi query)
     */
    public function getKelasList(string $tipe, string $search, int $page, int $perPage)
    {
        // Pisahkan logika pencarian dari Cache untuk menghindari Cache DoS (OOM)
        if (!empty($search)) {
            $query = KelasPelatihan::select('id', 'judul', 'deskripsi', 'tipe', 'link', 'biaya');
            
            if ($tipe !== 'Semua') {
                $query->where('tipe', $tipe);
            }
            
            $query->whereFullText(['judul', 'deskripsi'], $search);
            return $query->orderBy('id', 'asc')->paginate($perPage);
        } else {
            $version = Cache::get('kelas_pelatihan_version', 1);
            $cacheKey = "kelas_pel_v{$version}_{$tipe}_page_{$page}_limit_{$perPage}";

            return Cache::remember($cacheKey, now()->addMinutes(60), function () use ($tipe, $perPage) {
                $query = KelasPelatihan::select('id', 'judul', 'deskripsi', 'tipe', 'link', 'biaya');
                if ($tipe !== 'Semua') {
                    $query->where('tipe', $tipe);
                }
                return $query->orderBy('id', 'asc')->paginate($perPage);
            });
        }
    }

    /**
     * Tambah kelas pelatihan baru
     */
    public function createKelas(array $data)
    {
        $kelas = KelasPelatihan::create($data);
        $this->clearKelasCache();
        return $kelas;
    }

    /**
     * Perbarui kelas pelatihan
     */
    public function updateKelas(KelasPelatihan $kelas, array $data)
    {
        $kelas->update($data);
        $this->clearKelasCache();
        return $kelas;
    }

    /**
     * Hapus kelas pelatihan
     */
    public function deleteKelas(KelasPelatihan $kelas)
    {
        $kelas->delete();
        $this->clearKelasCache();
    }

    /**
     * Helper: Hapus/invalidasi hanya cache yang berkaitan dengan kelas pelatihan
     */
    private function clearKelasCache(): void
    {
        if (!Cache::has('kelas_pelatihan_version')) {
            Cache::put('kelas_pelatihan_version', 2);
        } else {
            Cache::increment('kelas_pelatihan_version');
        }
    }
}
