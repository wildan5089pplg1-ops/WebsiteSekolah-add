<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Karir extends Model
{
    protected $fillable = [
        'nama_pekerjaan',
        'deskripsi',
        'jurusan',
        'link'
    ];
}
