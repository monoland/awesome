<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class PasswordCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return PasswordResource::collection($this->collection);
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

                'title' => 'Password',

                'softDeletes' => false,

                'findOn' => 'name',

                'combos' => [],

                'filters' => [],

                'headers' => [],

                'permissions' => [
                    'create' => $request->user()->hasPermission('update-moui-password')
                ],

                'record' => [
                    'avatar' => '',
                    'background' => '',
                ]
            ]
        ];
    }
}
