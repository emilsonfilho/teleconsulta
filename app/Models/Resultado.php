<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Resultado extends Model
{
    use HasFactory;
    protected $table = 'tb_resultados';
    protected $primaryKey = 'resultado_id';
    public $timestamps = false;
}
