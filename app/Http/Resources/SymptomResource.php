<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SymptomResource extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'sintoma_id' => $this->whenNotNull($this->sintoma_id),
            'sintoma_nome' => $this->whenNotNull($this->sintoma->nome),
        ];
    }
}
