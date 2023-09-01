<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PacientesController;
use App\Http\Controllers\SintomasController;
use App\Http\Controllers\ConsultasController;
use App\Http\Controllers\ResultadosController;  

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/getPacientes', [PacientesController::class, 'index']);

Route::get('/pacientes/fotos/{filename}', [PacientesController::class, 'getImage']);

Route::post('/pacientes/cadastrarPaciente', [PacientesController::class, 'post']);

Route::get('/infoPaciente/{id}', [PacientesController::class, 'getPaciente']);

Route::get('/getSintomas', [SintomasController::class, 'index']);

Route::post('/consultas/cadastrarConsulta', [ConsultasController::class, 'post']);

Route::delete('/pacientes/deletarPaciente/{id}', [PacientesController::class, 'destroy']);