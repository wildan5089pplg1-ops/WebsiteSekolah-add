<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PpdbRegistration extends Model
{
    use HasFactory;

    protected $fillable = [
        'registration_number',
        'full_name',
        'nisn',
        'gender',
        'birth_place',
        'birth_date',
        'religion',
        'previous_school',
        'major',
        'path',
        'parent_name',
        'phone',
        'email',
        'address',
        'status',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];
}
