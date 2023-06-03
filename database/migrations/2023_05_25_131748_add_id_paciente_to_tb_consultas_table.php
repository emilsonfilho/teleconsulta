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
        Schema::table('tb_consultas', function (Blueprint $table) {
            $table->foreignId('id_paciente')->constrained('tb_pacientes', 'paciente_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tb_consultas', function (Blueprint $table) {
            $table->dropForeign(['id_paciente']);
            $table->dropColumn('id_paciente');
        });
    }
};
