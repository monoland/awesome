<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModuleList extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'path' => $this->path,
            'icon' => $this->icon,
            'maps' => $this->maps,
            'menu' => $this->menu,
            'apps' => $this->apps,
        ];
    }
}
