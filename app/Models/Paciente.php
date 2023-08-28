<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Paciente extends Model
{
    use HasFactory;

    protected $table = 'tb_pacientes';
    protected $primaryKey = 'paciente_id';
    protected $fillable = [
        'paciente_nome',
        'paciente_dataN',
        'paciente_cpf',
        'paciente_telefone',
        'paciente_foto'
    ];
    protected function pacienteImagemUrl(): Attribute
    {
        return Attribute::make(
            get: fn () => Storage::url($this->attributes['paciente_foto']),
        );
    }

    public $timestamps = false;

    public function consulta() {
        return $this->hasMany(Consulta::class, 'id_paciente', 'paciente_id');
    }
}
