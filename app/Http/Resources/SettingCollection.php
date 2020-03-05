<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class SettingCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return SettingResource::collection($this->collection);
    }

    /**
     * Get additional data that should be returned with the resource array.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return array
     */
    public function with($request)
    {
        return [
            'setups' => [
                'icon' => 'home',

                'title' => 'Setting',

                'softDeletes' => false,

                'findOn' => 'name',

                'combos' => [],

                'filters' => [],

                'headers' => [],

                'permissions' => [
                    'create' => $request->user()->hasPermission('update-moui-setting')
                ],

                'record' => [
                    'id' => null,
                    'name' => null
                ]
            ]
        ];
    }
}
