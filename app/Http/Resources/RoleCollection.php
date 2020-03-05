<?php

namespace App\Http\Resources;

use App\Models\Module;
use Illuminate\Http\Resources\Json\ResourceCollection;

class RoleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return RoleResource::collection($this->collection);
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

                'title' => 'Role',

                'softDeletes' => $request->user()->hasAnyPermission('restore-moui-role', 'force-delete-moui-role'),

                'findOn' => 'name',

                'combos' => [
                    'modules' => ModuleResource::collection(Module::orderBy('_lft', 'asc')->get())
                ],

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
                'permissions' => $request->user()->permissionsOnModule('moui-role'),

                'record' => [
                    'id' => null,
                    'name' => null,
                    'modules' => [],
                    'permissions' => []
                ]
            ]
        ];
    }
}
