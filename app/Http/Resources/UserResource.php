<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'email' => $this->email,
            'avatar' => $this->avatar,
            'background' => $this->background,
            'theme' => $this->theme,
            'active' => $this->active,
            'role' => optional($this->role)->id,
            'updated_at' => (string) $this->updated_at,

            'mobile_title' => $this->name,
            'mobile_subtitle' => "updated: {$this->updated_at}",
        ];
    }
}
