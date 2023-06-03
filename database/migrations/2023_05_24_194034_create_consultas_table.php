<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tb_consultas', function (Blueprint $table) {
            $table->id('consulta_id');
            $table->date('consulta_dataAtendimento')->nullable(false);
            $table->decimal('consulta_temperaturaPaciente', 5, 2)->nullable(false);
            $table->decimal('consulta_frequenciaCardiacaPaciente', 6, 2)->nullable(false);
            $table->decimal('consulta_pressaoArterialSistolicaPaciente', 5, 2)->nullable(false);
            $table->decimal('consulta_pressaoArterialDiastolicaPaciente', 5, 2)->nullable(false);
            $table->decimal('consulta_frequenciaRespiratoriaPaciente', 5, 2)->nullable(false);
            $table->json('ids_sintomas')->nullable(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_consultas');
    }
};
