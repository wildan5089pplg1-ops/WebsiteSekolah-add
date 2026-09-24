<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * Class KelasPelatihan
 * 
 * @property int $id
 * @property string $judul
 * @property string $deskripsi
 * @property string $tipe
 * @property string $link
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
class KelasPelatihan extends Model
{
    use HasFactory;

    protected $table = 'kelas_pelatihan';

    protected $fillable = [
        'judul',
        'deskripsi',
        'tipe',
        'link',
        'biaya',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
