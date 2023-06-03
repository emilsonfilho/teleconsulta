<?php

namespace App\Http\Controllers;

use App\Models\Paciente;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class PacientesController extends Controller
{
    public function index()
    {
        $pacientes = Paciente::orderBy('paciente_atendido')->orderBy('paciente_nome', 'asc')->get();
        return response()->json($pacientes);
    }

    public function getImage($filename) 
    {
        $path = public_path('pacientes/' . $filename);

        if (file_exists($path)) {
            return response()->file($path);
        }

        abort(404);
    }

    public function post(Request $request) 
    {

        try {
            $this->validate($request, [
                'paciente_cpf'=> 'required|cpf',
            ]);
        
            $novoPaciente = new Paciente();
            
            if ($request->hasFile('paciente_foto') && $request->file('paciente_foto')->isValid()) {
                $request_image = $request->paciente_foto;
    
                $typesPermitidos = ['png', 'jpg', 'jpeg'];
                $extension = $request_image->getClientOriginalExtension();
    
                if (!in_array($extension, $typesPermitidos)) {
                    return response()->json(['error' => 'Formato de imagem inválido. Use arquivos PNG, JPG ou JPEG.'], 400);
                }
    
                $image_name = md5($request_image->getClientOriginalName() . strtotime("now") . "." . $extension);
    
                $request->paciente_foto->move(public_path('pacientes/'), $image_name);
    
                $novoPaciente->paciente_foto = $image_name;
            } else {
                return response()->json(['error' => 'Você não enviou um arquivo de imagem!'], 400);
            }
    
    
            $novoPaciente->paciente_nome = $request->paciente_nome;
            $novoPaciente->paciente_dataN = $request->paciente_dataN;
            $novoPaciente->paciente_cpf = $request->paciente_cpf;
            $novoPaciente->paciente_telefone = $request->paciente_telefone;
            $novoPaciente->paciente_atendido = false;
    
            $novoPaciente->save();
    
            return response()->json(['message' => 'Requisição POST bem-sucedida']);
        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();

            return response()->json(['error' => $errorMessage], 400);
        }
        
    }

    public function getPaciente($id) {
        $paciente = Paciente::where('paciente_id', $id)->first();

        if (!$paciente) {
            return response()->json(['error' => 'Paciente não encontrtado.'], 400);
        }

        return response()->json($paciente);
    }
}
