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
    public function index($id) {
        $consultas = Consulta::where('id_paciente', $id)->get();
        return response()->json($consultas);
    }
    
    public function post(Request $request) {
        $quantidadeSintomas = Sintoma::count();
        $consulta = new Consulta();

        $dataAtual = Carbon::now();
        $dataFormatada = $dataAtual->format('Y-m-d');

        $idsString = $request->input('ids_sintomas');
        $idsArray = json_decode($idsString, true);
        $ids = array_column($idsArray, 'sintoma_id');

        $porcentagem = round(((count($ids) / $quantidadeSintomas) * 100), 1); // Porcentagem com uma casa decimal

        if ($porcentagem >= 60) {
            $resultado = "Possível infectado";
        } else if ($porcentagem >= 40) {
            $resultado = "Possível infectado";
        } else {
            $resultado = "Sintomas insuficientes";
        }

        $id_resultado = Resultado::where("resultado_nome", $resultado)->first()->resultado_id;
        $id_paciente = $request->input('id_paciente');
        
        $consulta->consulta_dataAtendimento = $dataFormatada;
        $consulta->consulta_temperaturaPaciente = $this->convertDecimal($request->input('consulta_temperaturaPaciente'));
        $consulta->consulta_frequenciaRespiratoriaPaciente = $this->convertDecimal($request->input('consulta_frequenciaRespiratoriaPaciente'));
        $consulta->consulta_frequenciaCardiacaPaciente = $this->convertDecimal($request->input('consulta_frequenciaCardiacaPaciente'));
        $consulta->consulta_pressaoArterialSistolicaPaciente = $this->convertDecimal($request->input('consulta_pressaoArterialSistolicaPaciente'));
        $consulta->consulta_pressaoArterialDiastolicaPaciente = $this->convertDecimal($request->input('consulta_pressaoArterialDiastolicaPaciente'));
        $consulta->ids_sintomas = $ids;
        $consulta->id_paciente = $id_paciente;
        $consulta->id_resultado = $id_resultado;
        $consulta->save();

        $qntdConsultasPaciente = Consulta::where('id_paciente', $id_paciente)->count();

        if ($qntdConsultasPaciente !== 0) {
            $paciente = Paciente::where('paciente_id', $id_paciente)->first();
            $paciente->paciente_atendido = true;
            $paciente->save();
        }

        return response()->json(['message', 'Consulta registrada com sucesso.']);
    }

    private function convertDecimal($value) {
        return floatval(str_replace(',', '.', $value));
    }
}