<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Consulta extends Model
{
    use HasFactory;
    protected $table = 'tb_consultas';
    protected $casts = [
        'ids_sintomas' => 'array',
    ];
    public $timestamps = false;
}
