<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ClientCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return ClientResource::collection($this->collection);
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

                'title' => 'Client',

                'softDeletes' => $request->user()->hasAnyPermission('restore-moui-client', 'force-delete-moui-client'),

                'findOn' => 'name',

                'combos' => [],

                /**
                 * filters
                 * ['text' => 'filter none', 'icon' => 'select_all', 'value' => null],
                 * ['text' => 'filter some', 'icon' => 'icon', 'value' => ['filterOn' => 'field', 'filterBy' => 'text']],
                 */
                'filters' => [],

                'headers' => [
                    ['text' => 'Name', 'value' => 'name'],
                    ['text' => 'Updated', 'value' => 'updated_at', 'class' => 'field-datetime'],
                ],

                /**
                 * permissions
                 * ['create' => bool, 'update' => bool, 'delete' => bool, 'restore' => bool, 'forceDelete' => bool]
                 */
                'permissions' => $request->user()->permissionsOnModule('moui-client'),

                'record' => [
                    'id' => null,
                    'name' => null,
                    'secret' => null,
                ]
            ]
        ];
    }
}
