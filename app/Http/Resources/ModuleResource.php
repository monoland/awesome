<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ModuleResource extends JsonResource
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
            'slug' => $this->slug,
            'path' => $this->path,
            'maps' => $this->maps,
            'icon' => $this->icon,
            'apps' => $this->apps,
            'menu' => $this->menu,
            'icon_icon' => '<i aria-hidden="true" class="v-icon notranslate material-icons theme--light">' . $this->icon . '</i>',
            'menu_icon' => '<i aria-hidden="true" class="v-icon notranslate material-icons theme--light">' . ($this->menu ? 'check_box' : 'check_box_outline_blank') . '</i>',
            'labels' => $this->permissions()->orderBy('name')->pluck('name'),
            'permissions' => $this->permissions()->orderBy('name')->pluck('id'),
            'updated_at' => (string) $this->updated_at,

            'mobile_title' => $this->name,
            'mobile_subtitle' => "updated: {$this->updated_at}",
        ];
    }
}
