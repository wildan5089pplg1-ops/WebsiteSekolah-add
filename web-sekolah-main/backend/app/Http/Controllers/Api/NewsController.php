<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponseTrait;

class NewsController extends Controller
{
    use ApiResponseTrait;

    public function index(Request $request)
    {
        $news = News::with('author')
            ->where('status', 'published')
            ->orderBy('date', 'desc')
            ->get()
            ->map(function ($item) {
                return [
                    'id' => $item->id,
                    'title' => $item->title,
                    'slug' => $item->slug,
                    'category' => $item->category,
                    'date' => $item->date,
                    'summary' => $item->summary,
                    'content' => $item->content,
                    'image' => $item->image,
                    'views_count' => $item->views_count,
                    'author' => $item->author ? $item->author->name : 'Admin',
                ];
            });
        return response()->json([
            'success' => true,
            'data' => $news
        ]);
    }

    public function show($id)
    {
        // Temukan berdasarkan ID atau Slug
        $news = News::with('author')
                    ->where('id', $id)
                    ->orWhere('slug', $id)
                    ->first();
        
        if (!$news) {
            return $this->errorResponse('Berita tidak ditemukan', 404);
        }

        // Tambah view count
        $news->increment('views_count');

        $formatted = [
            'id' => $news->id,
            'title' => $news->title,
            'slug' => $news->slug,
            'category' => $news->category,
            'date' => $news->date,
            'summary' => $news->summary,
            'content' => $news->content,
            'image' => $news->image,
            'views_count' => $news->views_count,
            'author' => $news->author ? $news->author->name : 'Admin',
        ];

        return response()->json([
            'success' => true,
            'data' => $formatted
        ]);
    }
}
