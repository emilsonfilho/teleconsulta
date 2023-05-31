<?php

use App\Http\Controllers\PacientesController;
use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/getPacientes', [PacientesController::class, 'index']);

Route::get('/pacientes/fotos/{filename}', [PacientesController::class, 'getImage']);

Route::post('/pacientes/cadastrarPaciente', [PacientesController::class, 'post']);

Route::get('/infoPaciente/{id}', [PacientesController::class, 'getPaciente']);