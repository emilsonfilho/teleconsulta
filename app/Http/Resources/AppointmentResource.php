<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AppointmentResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'consulta_id' => $this->whenNotNull($this->consulta_id),
            'consulta_dataAtendimento' => $this->whenNotNull($this->consulta_dataAtendimento),
            'consulta_temperaturaPaciente' => $this->whenNotNull($this->consulta_temperaturaPaciente),
            'consulta_frequenciaCardiacaPaciente' => $this->whenNotNull($this->consulta_frequenciaCardiacaPaciente),
            'consulta_pressaoArterialSistolicaPaciente' => $this->whenNotNull($this->consulta_pressaoArterialSistolicaPaciente),
            'consulta_pressaoArterialDiastolicaPaciente' => $this->whenNotNull($this->consulta_pressaoArterialDiastolicaPaciente),
            'consulta_frequenciaRespiratoriaPaciente' => $this->whenNotNull($this->consulta_frequenciaRespiratoriaPaciente),
            'id_resultado' => $this->whenNotNull($this->id_resultado),
        ];
    }
}
