<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Resultado;
use App\Models\Sintoma;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Sintoma::create([
            'sintoma_nome' => 'Febre'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Coriza'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Nariz Entupido'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Cansaço'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Tosse'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Dor de cabeça'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Dores no corpo'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Mal estar geral'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Dor de garganta'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Dificuldade de respirar'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Falta de paladar'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Falta de olfato'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Dificuldade de locomoção'
        ]);

        Sintoma::create([
            'sintoma_nome' => 'Diarréia'
        ]);

        Resultado::create([
            'resultado_nome' => 'Sintomas insuficientes'
        ]);

        Resultado::create([
            'resultado_nome' => 'Potencial infectado'
        ]);

        Resultado::create([
            'resultado_nome' => 'Possível infectado'
        ]);
    }
}
