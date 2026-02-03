<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CampusBoundary extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'geometry'];

    protected $casts = [
        'geometry' => 'array',
    ];
}
