<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;

class NewsController extends Controller
{
    public function index()
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
            return response()->json([
                'success' => false,
                'message' => 'News not found'
            ], 404);
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
