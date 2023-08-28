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
    protected $primaryKey = 'consulta_id';
    protected $fillable = [
        'consulta_temperaturaPaciente',
        'consulta_frequenciaCardiacaPaciente',
        'consulta_pressaoArterialSistolicaPaciente',
        'consulta_pressaoArterialDiastolicaPaciente',
        'consulta_frequenciaRespiratoriaPaciente',
        'consulta_dataAtendimento',
        'ids_sintomas',
        'id_paciente',
        'id_resultado'
    ];

    public $timestamps = false;
    
    public function patient() {
        return $this->belongsTo(Paciente::class, 'paciente_id', 'id_paciente');
    }
    
    public function result() {
        return $this->belongsTo(Resultado::class, 'id_resultado');
    }
}
