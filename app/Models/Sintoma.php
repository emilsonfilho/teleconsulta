<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sintoma extends Model
{
    use HasFactory;
    protected $table = 'tb_sintomas';
    protected $primaryKey = 'sintoma_id';
    public $timestamps = false;
}
