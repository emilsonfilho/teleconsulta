<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Resultado;

class ResultadosController extends Controller
{
    public function getResultado($id) {
        $resultado = Resultado::where('resultado_id', $id)->first()->resultado_nome;
        return response()->json($resultado);
    }
}
