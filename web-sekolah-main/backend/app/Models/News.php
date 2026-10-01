<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;

    protected $fillable = ['title', 'slug', 'category', 'date', 'summary', 'content', 'image', 'author_id', 'status', 'views_count'];

    public function author()
    {
        return $this->belongsTo(User::class, 'author_id');
    }
}
