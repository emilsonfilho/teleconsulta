<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePatientRequest;
use App\Http\Resources\PatientResource;
use App\Models\Consulta;
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
            ->paginate(5);

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
    }

    // Pega o paciente no banco de dados com base no ID do mesmo
    public function getPaciente(int $id): JsonResource
    {
            $paciente = Paciente::with(['consulta' => function($query) {
                $query->select('consulta_dataAtendimento', 'consulta_temperaturaPaciente', 'consulta_pressaoArterialSistolicaPaciente', 'consulta_pressaoArterialDiastolicaPaciente', 'consulta_frequenciaCardiacaPaciente', 'consulta_frequenciaRespiratoriaPaciente', 'id_resultado', 'id_paciente', 'consulta_id');
            }, 'consulta.result' => function($query) {
                $query->select('resultado_id', 'resultado_nome');
            }])
                ->findOrFail($id);

        return PatientResource::make($paciente);
    }
    
    public function destroy($id) {
        Consulta::where('id_paciente', $id)->delete();
        Paciente::where('paciente_id', $id)->delete();
        return response()->json(['message' => 'Paciente removido com sucesso.']);
    }
}




