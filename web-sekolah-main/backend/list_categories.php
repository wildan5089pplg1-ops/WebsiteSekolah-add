<?php
require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$app->make(Illuminate\Contracts\Console\Kernel::class)->bootstrap();

use App\Models\BukuSlims;

$books = BukuSlims::whereNotNull('subjek_kategori')
    ->where('subjek_kategori', '!=', '')
    ->get(['subjek_kategori']);

$tags = [];
foreach ($books as $book) {
    preg_match_all('/<([^>]+)>/', $book->subjek_kategori, $matches);
    foreach ($matches[1] as $tag) {
        $tag = trim($tag);
        if (!isset($tags[$tag])) $tags[$tag] = 0;
        $tags[$tag]++;
    }
}
arsort($tags);
echo json_encode($tags, JSON_PRETTY_PRINT);
