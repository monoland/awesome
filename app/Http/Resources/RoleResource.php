<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class RoleResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'modules' => [],
            'permissions' => $this->permissions->pluck('id'),
            'updated_at' => (string) $this->updated_at,

            'mobile_title' => $this->name,
            'mobile_subtitle' => "updated: {$this->updated_at}",
        ];
    }
}
