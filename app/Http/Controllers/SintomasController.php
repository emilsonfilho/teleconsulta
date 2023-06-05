<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sintoma;

class SintomasController extends Controller
{
    // Pega todos os sintomas do banco de dados
    public function index() {
        $sintomas = Sintoma::all();
        return response()->json($sintomas);
    }
}
