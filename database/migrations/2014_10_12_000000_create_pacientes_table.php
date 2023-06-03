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
        Schema::create('tb_pacientes', function (Blueprint $table) {
            $table->id('paciente_id');
            $table->string('paciente_foto');
            $table->string('paciente_nome', 60)->nullable(false);
            $table->date('paciente_dataN')->nullable(false);
            $table->string('paciente_cpf', 14)->nullable(false);
            $table->string('paciente_telefone', 20)->nullable(false);
            $table->boolean('paciente_atendido')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tb_pacientes');
    }
};
