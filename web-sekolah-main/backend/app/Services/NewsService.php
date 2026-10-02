<?php

namespace App\Services;

use App\Models\News;

class NewsService
{
    public function getAllNews()
    {
        return News::orderBy('date', 'desc')->get();
    }

    public function getNewsById($id)
    {
        return News::find($id);
    }
}
