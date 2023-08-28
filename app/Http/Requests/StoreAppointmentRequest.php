<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $fieldsToConvert = [
            'consulta_temperaturaPaciente',
            'consulta_frequenciaCardiacaPaciente',
            'consulta_pressaoArterialSistolicaPaciente',
            'consulta_pressaoArterialDiastolicaPaciente',
            'consulta_frequenciaRespiratoriaPaciente',
        ];

        foreach ($fieldsToConvert as $field) {
            if ($this->filled($field)) {
                $this->merge([$field => str_replace(',', '.', $this->$field)]);
            }
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'consulta_temperaturaPaciente' => 'numeric|required',
            'consulta_frequenciaCardiacaPaciente' => 'numeric|required',
            'consulta_pressaoArterialSistolicaPaciente' => 'numeric|required',
            'consulta_pressaoArterialDiastolicaPaciente' => 'numeric|required',
            'consulta_frequenciaRespiratoriaPaciente' => 'numeric|required',
        ];
    }

    public function messages(): array
    {
        return [
            'consulta_temperaturaPaciente.numeric' => 'O valor deve ser um número.'
        ];
    }
}
