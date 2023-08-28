<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePatientRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'paciente_nome' => 'string|required',
            'paciente_dataN' => 'string|required|date|date_format:Y-m-d',
            'paciente_cpf' => 'required|cpf',
            'paciente_telefone' => 'required|string',
            'paciente_foto' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];
    }
}
