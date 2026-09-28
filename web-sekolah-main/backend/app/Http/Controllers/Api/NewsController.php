<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\News;
use Illuminate\Http\Request;
use App\Http\Traits\ApiResponseTrait;

class NewsController extends Controller
{
    use ApiResponseTrait;

    public function index(Request $request)
    {
        $request->validate([
            'per_page' => 'sometimes|integer|min:1|max:100'
        ]);

        $perPage = (int) $request->input('per_page', 10);
        $news = News::orderBy('date', 'desc')->paginate($perPage);

        return $this->successResponse($news, 'Data berita berhasil dimuat');
    }

    public function show($id)
    {
        $news = News::find($id);
        
        if (!$news) {
            return $this->errorResponse('Berita tidak ditemukan', 404);
        }

        return $this->successResponse($news, 'Detail berita berhasil dimuat');
    }
}
