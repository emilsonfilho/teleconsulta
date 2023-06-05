<?php

namespace App\Http\Controllers;

use App\Models\Consulta;
use App\Models\Resultado;
use App\Models\Sintoma;
use App\Models\Paciente;
use Illuminate\Http\Request;
use Carbon\Carbon;

class ConsultasController extends Controller
{
    // Função para pegar todas as consultas de um determinado paciente baseado no ID
    public function index($id) {
        $consultas = Consulta::where('id_paciente', $id)->get();
        return response()->json($consultas);
    }
    
    // Função para fazer o cadastro de uma consulta
    public function post(Request $request) {
        $quantidadeSintomas = $this->getTotalSintomas();
        $ids = $this->getIdsSintomas($request);
        $porcentagem = $this->getProbabilidadeInfeccao($ids, $quantidadeSintomas);
        $resultado = $this->getResultadoSintomas($porcentagem);
        $id_resultado = $this->getIdResultadoPorNome($resultado);
        $id_paciente = $this->getIdPaciente($request);
        
        $consulta = $this->createConsulta($request, $ids, $id_paciente, $id_resultado);
        $this->saveConsulta($consulta);

        $this->verifyPacienteAtendido($id_paciente);

        return response()->json(['message', 'Consulta registrada com sucesso.']);
    }

    private function getInputValue($request, $inputName) {
        return $request->input($inputName);
    }

    // Pega o valor do input do formulário com base no nome
    private function getIdPaciente($request) {
        return $this->getInputValue($request, 'id_paciente');
    }

    // Conta a quantidade total de sintomas
    private function getTotalSintomas() {
        return Sintoma::count();
    }

    // Função que pega retorna os ids dos sintomas que vem em formato string
    private function getIdsSintomas($request) {
        $value = $request->input('ids_sintomas');
        $idsArray = json_decode($value, true);
        return array_column($idsArray, 'sintoma_id');
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

    //  Verifica se o paciente já foi atendido
    private function verifyPacienteAtendido($id_paciente) {
        $qntdConsultasPaciente = $this->countConsultasPaciente($id_paciente);

        if ($qntdConsultasPaciente !== 0) {
            $paciente = Paciente::where('paciente_id', $id_paciente)->first();
            $paciente->paciente_atendido = true;
            $paciente->save();
        }        
    }

    // Conta a quantidade de consultas que o paciente já possui
    private function countConsultasPaciente($id_paciente) {
        return Consulta::where('id_paciente', $id_paciente)->count();
    }

    // Cria um objeto de consulta com base no Model Consulta
    private function createConsulta($request, $ids, $id_paciente, $id_resultado) {
        $consulta = new Consulta();
        $consulta->consulta_dataAtendimento = $this->formatData(Carbon::now());
        $consulta->consulta_temperaturaPaciente = $this->convertDecimal($this->getInputValue($request, 'consulta_temperaturaPaciente'));
        $consulta->consulta_frequenciaRespiratoriaPaciente = $this->convertDecimal($this->getInputValue($request, 'consulta_frequenciaRespiratoriaPaciente'));
        $consulta->consulta_frequenciaCardiacaPaciente = $this->convertDecimal($this->getInputValue($request, 'consulta_frequenciaCardiacaPaciente'));
        $consulta->consulta_pressaoArterialSistolicaPaciente = $this->convertDecimal($this->getInputValue($request, 'consulta_pressaoArterialSistolicaPaciente'));
        $consulta->consulta_pressaoArterialDiastolicaPaciente = $this->convertDecimal($this->getInputValue($request, 'consulta_pressaoArterialDiastolicaPaciente'));
        $consulta->ids_sintomas = $ids;
        $consulta->id_paciente = $id_paciente;
        $consulta->id_resultado = $id_resultado;
        return $consulta;
    }

    // Salva uma consulta no banco de dados
    private function saveConsulta($consulta) {
        $consulta->save();
    }

    // Converte um valor em decimal com vírgula para pontos
    private function convertDecimal($value) {
        return floatval(str_replace(',', '.', $value));
    }

    // Retorna um valor de data no formato internacional
    private function formatData($value) {
        return $value->format('Y-m-d');
    }

}