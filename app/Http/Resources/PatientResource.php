<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PatientResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'paciente_id' =>  $this->whenNotNull($this->paciente_id),
            'paciente_nome' => $this->whenNotNull($this->paciente_nome),
            'paciente_dataN' => $this->whenNotNull($this->paciente_dataN),
            'paciente_cpf' => $this->whenNotNull($this->paciente_cpf),
            'paciente_telefone' => $this->whenNotNull($this->paciente_telefone),
            'paciente_foto' => $this->whenNotNull($this->paciente_foto),
            'paciente_atendido' => $this->whenNotNull($this->paciente_atendido),
            'consulta' => AppointmentResource::collection($this->whenLoaded('consulta')),
        ];
    }
}
