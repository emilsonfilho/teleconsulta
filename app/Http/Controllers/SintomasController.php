<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sintoma;

class SintomasController extends Controller
{
    public function index() {
        $sintomas = Sintoma::all();
        return response()->json($sintomas);
    }
}
