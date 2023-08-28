<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Paciente;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class PacientesController extends Controller
{
    // Retorna todos os pacientes do banco em ordem alfabética e na ordem de não atendido para atendido
    public function index(): JsonResource
    {
        $pacientes = Paciente::orderBy('paciente_atendido')
            ->with([
                'consulta' => function($query) {
                    $query->select('consulta_dataAtendimento', 'id_resultado', 'consulta_id', 'id_paciente');
                },
                'consulta.result'
            ])
            ->orderBy('paciente_nome', 'asc')
            ->get();

        return PatientResource::collection($pacientes);
    }

    // Cadastra o paciente no banco de dados
    public function post(StorePatientRequest $request) 
    {        
        $data = $request->validated(); 
        
        $data['paciente_foto'] = Storage::disk('public')->put('pacientes', $data['paciente_foto']);
        
        Paciente::create($data);
        
        return response()->json([
            'message' => 'Requisição POST bem-sucedida',
            'path' => $data['paciente_foto'],
        ]);
        //return response()->json($data['paciente_foto']);
    }

    // Pega o paciente no banco de dados com base no ID do mesmo
    public function getPaciente(int $id): JsonResource
    {
        $paciente = Paciente::findOrFail($id);
        //return response()->json($paciente);
        return new PatientResource($paciente);
    }
}









