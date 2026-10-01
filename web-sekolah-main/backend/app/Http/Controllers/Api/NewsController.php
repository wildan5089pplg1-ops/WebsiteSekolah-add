<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\NewsService;

class NewsController extends Controller
{
    protected $newsService;

    public function __construct(NewsService $newsService)
    {
        $this->newsService = $newsService;
    }

    public function index()
    {
        $news = $this->newsService->getAllNews();
        return response()->json([
            'success' => true,
            'data' => $news
        ]);
    }

    public function show($id)
    {
        $news = $this->newsService->getNewsById($id);
        
        if (!$news) {
            return response()->json([
                'success' => false,
                'message' => 'News not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $news
        ]);
    }
}
