<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAppointmentRequest;
use App\Http\Resources\AppointmentResource;
use App\Http\Resources\SymptomResource;
use App\Models\Consulta;
use App\Models\Resultado;
use App\Models\Sintoma;
use App\Models\Paciente;
use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class ConsultasController extends Controller
{
    // Função para pegar todas as consultas de um determinado paciente baseado no ID
    public function index($id): JsonResource
    {
        $consultas = Consulta::where('id_paciente', $id)->get();
        return AppointmentResource::collection($consultas);
    }
    
    // Função para fazer o cadastro de uma consulta
    public function post(StoreAppointmentRequest $request) {
        $data = $request->validated();

        $ids = $this->getIdsSintomas($request);
        $id_resultado = $this->getIdResultado($ids);
        $id_paciente = $this->getInputValue($request, 'id_paciente');
        
        $data['consulta_dataAtendimento'] = Carbon::now();
        $data['ids_sintomas'] = $ids;
        $data['id_paciente'] = $id_paciente;
        $data['id_resultado'] = $id_resultado;

        Consulta::create($data);

        $paciente = Paciente::where('paciente_id', $id_paciente);
        if (!($paciente->first()->paciente_atendido)) {
            $paciente->update(['paciente_atendido' => true]);
        }
        
        return response()->json(['message', 'Consulta registrada com sucesso.']);
    }
    
    private function getIdResultado($ids) {
        $quantidadeSintomas = $this->getTotalSintomas();
        $porcentagem = $this->getProbabilidadeInfeccao($ids, $quantidadeSintomas);
        $resultado = $this->getResultadoSintomas($porcentagem);
        return $this->getIdResultadoPorNome($resultado);
    }

    private function getInputValue($request, $inputName) {
        return $request->input($inputName);
    }

    // Conta a quantidade total de sintomas
    private function getTotalSintomas() {
        return Sintoma::count();
    }

    // Função que pega retorna os ids dos sintomas que vem em formato string
    private function getIdsSintomas($request) {
        $value = $request->input('ids_sintomas');
        $idsArray = json_decode($value, true);
        $sintomas = Sintoma::whereIn('sintoma_id', array_column($idsArray, 'sintoma_id'))->get();
        return new SymptomResource($sintomas);
    }

    // Faz o cálculo da probabilidade de infecção do paciente
    private function getProbabilidadeInfeccao($ids, $quantidadeSintomas) {
        return round(((count($ids) / $quantidadeSintomas) * 100), 1);
    }

    //  Verifica em qual estado de infecção o paciente se encontra
    private function getResultadoSintomas($porcentagem) {
        if ($porcentagem >= 60) {
            return "Possível infectado";
        } else if ($porcentagem >= 40) {
            return "Possível infectado";
        } else {
            return "Sintomas insuficientes";
        }
    }
    
    // Pega o ID do resultado com base no nome recebido
    private function getIdResultadoPorNome($nome) {
        return Resultado::where("resultado_nome", $nome)->first()->resultado_id;
    }
}






