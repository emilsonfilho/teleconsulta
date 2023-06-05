<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PacientesController extends Controller
{
    // Retorna todos os pacientes do banco em ordem alfabética e na ordem de não atendido para atendido
    public function index()
    {
        $pacientes = Paciente::orderBy('paciente_atendido')->orderBy('paciente_nome', 'asc')->get();
        return response()->json($pacientes);
    }

    // Manda a foto para o servidor
    public function getImage($filename) 
    {
        $path = public_path('pacientes/' . $filename);

        if (file_exists($path)) {
            return response()->file($path);
        }

        abort(404);
    }

    // Cadastra o paciente no banco de dados
    public function post(Request $request) 
    {
        $this->validateCPF($request);
        $paciente = $this->createPaciente($request);
        $this->handlePacienteFotoUpdate($paciente, $request);
        $this->updatePaciente($request, $paciente);
        $this->savePaciente($paciente);

        return response()->json(['message' => 'Requisição POST bem-sucedida']);
    }

    // Pega o paciente no banco de dados com base no ID do mesmo
    public function getPaciente($id) {
        $paciente = Paciente::where('paciente_id', $id)->first();
        
        if (!$paciente) {
            return response()->json(['error' => 'Paciente não encontrtado.'], 400);
        }

        return response()->json($paciente);
    }

    // Valida o CPF do paciente
    private function validateCPF($request) {
        $this->validate($request, [
            'paciente_cpf'=> 'required|cpf',
        ]);
    }

    // Cria um paciente novo com base no Model Paciente
    private function createPaciente($request) {
        return new Paciente();
    }

    // Cria o upload da foto do paciente
    private function handlePacienteFotoUpdate($paciente, $request) {
        if ($request->hasFile('paciente_foto') && $request->file('paciente_foto')->isValid()) {
            $request_image = $request->paciente_foto;

            $typesPermitidos = ['png', 'jpg', 'jpeg'];
            $extension = $request_image->getClientOriginalExtension();

            if (!in_array($extension, $typesPermitidos)) {
                return response()->json(['error' => 'Formato de imagem inválido. Use arquivos PNG, JPG ou JPEG.'], 400);
            }

            $image_name = md5($request_image->getClientOriginalName() . strtotime("now") . "." . $extension);

            $request->paciente_foto->move(public_path('pacientes/'), $image_name);

            $paciente->paciente_foto = $image_name;
        } else {
            return response()->json(['error' => 'Você não enviou um arquivo de imagem!'], 400);
        }
    }

    // Atualiza os dados do paciente
    private function updatePaciente($request, $paciente) {
        $paciente->paciente_nome = $request->paciente_nome;
        $paciente->paciente_dataN = $request->paciente_dataN;
        $paciente->paciente_cpf = $request->paciente_cpf;
        $paciente->paciente_telefone = $request->paciente_telefone;
        $paciente->paciente_atendido = false;
    }

    // Salva o paciente no banco de dados
    private function savePaciente($paciente) {
        $paciente->save();
    }
}
