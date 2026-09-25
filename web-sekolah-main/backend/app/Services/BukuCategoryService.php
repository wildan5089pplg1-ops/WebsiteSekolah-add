<?php

namespace App\Services;

/**
 * BukuCategoryService
 *
 * Memindahkan logika bisnis pembangunan hierarki kategori keluar dari Controller.
 * Alasan: Controller seharusnya hanya bertanggung jawab menerima request HTTP
 * dan mengembalikan response — bukan memproses data bisnis yang kompleks.
 *
 * Keuntungan pemisahan ini:
 * - Mudah diuji secara unit tanpa menyiapkan HTTP request
 * - Reusable jika endpoint atau CLI command lain membutuhkan data kategori
 * - Controller menjadi lebih ringkas dan fokus
 */
class BukuCategoryService
{
    /**
     * Bangun struktur hierarki kategori dari array raw string subjek_kategori SLiMS.
     *
     * Input  : ['<Novel><Fiksi Remaja>', '<Self Improvement>', ...]
     * Output : [
     *   ['name' => 'Fiksi & Novel', 'count' => 12, 'children' => [...]],
     *   ['name' => 'Pengembangan Diri', 'count' => 8, 'children' => [...]],
     *   ['name' => 'Lainnya', 'count' => 3, 'children' => [...]],
     * ]
     *
     * Konfigurasi grup diambil dari config/presmalib.php agar bisa diubah
     * tanpa menyentuh kode.
     *
     * @param string[] $rawList Array of raw subjek_kategori strings
     * @return array<int, array{name: string, count: int, children: array}>
     */
    public function buildHierarchy(array $rawList): array
    {
        $flatCats = $this->extractFlatCategories($rawList);
        $groups   = $this->groupByConfig($flatCats);
        $others   = $this->collectUngrouped($flatCats, $groups['assigned']);

        $result = $groups['groups'];

        if (!empty($others)) {
            usort($others, fn($a, $b) => $b['count'] <=> $a['count']);
            $result[] = [
                'name'     => 'Lainnya',
                'count'    => array_sum(array_column($others, 'count')),
                'children' => $others,
            ];
        }

        usort($result, fn($a, $b) => $b['count'] <=> $a['count']);

        return $result;
    }

    /**
     * Ekstrak semua tag individual dari array raw string dan hitung frekuensinya.
     * Format SLiMS: "<Tag1><Tag2><Tag3>"
     *
     * @param string[] $rawList
     * @return array<string, int>  ['Novel' => 27, 'Self Improvement' => 26, ...]
     */
    private function extractFlatCategories(array $rawList): array
    {
        $flatCats = [];

        foreach ($rawList as $raw) {
            preg_match_all('/<([^>]+)>/', $raw, $matches);
            foreach ($matches[1] ?? [] as $tag) {
                $tag = trim($tag);
                // Filter tag terlalu pendek (kemungkinan noise data)
                if (!empty($tag) && strlen($tag) > 2) {
                    $flatCats[$tag] = ($flatCats[$tag] ?? 0) + 1;
                }
            }
        }

        return $flatCats;
    }

    /**
     * Kelompokkan flat categories ke dalam grup sesuai konfigurasi.
     *
     * @param array<string, int> $flatCats
     * @return array{groups: array, assigned: array<string, bool>}
     */
    private function groupByConfig(array $flatCats): array
    {
        $categoryGroups = config('presmalib.category_groups', []);
        $groups         = [];
        $assigned       = [];

        foreach ($categoryGroups as $groupName => $keywords) {
            $children   = [];
            $groupTotal = 0;

            foreach ($flatCats as $tag => $count) {
                $tagLower = mb_strtolower($tag);
                foreach ($keywords as $keyword) {
                    if (str_contains($tagLower, mb_strtolower($keyword))) {
                        $children[]      = ['name' => $tag, 'count' => $count];
                        $groupTotal     += $count;
                        $assigned[$tag]  = true;
                        break;
                    }
                }
            }

            if (!empty($children)) {
                usort($children, fn($a, $b) => $b['count'] <=> $a['count']);
                $groups[] = [
                    'name'     => $groupName,
                    'count'    => $groupTotal,
                    'children' => $children,
                ];
            }
        }

        return ['groups' => $groups, 'assigned' => $assigned];
    }

    /**
     * Kumpulkan tag yang tidak cocok ke grup manapun.
     *
     * @param array<string, int>  $flatCats
     * @param array<string, bool> $assigned
     * @return array
     */
    private function collectUngrouped(array $flatCats, array $assigned): array
    {
        $others = [];
        foreach ($flatCats as $tag => $count) {
            if (!isset($assigned[$tag])) {
                $others[] = ['name' => $tag, 'count' => $count];
            }
        }
        return $others;
    }
}
