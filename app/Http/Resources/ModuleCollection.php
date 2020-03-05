<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\ResourceCollection;

class ModuleCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return ModuleResource::collection($this->collection);
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

                'title' => 'Module',

                'parent' => true,

                'softDeletes' => $request->user()->hasAnyPermission('restore-moui-module', 'force-delete-moui-module'),

                'findOn' => 'name',

                'combos' => [],

                'links' => [
                    ['icon' => 'arrow_downward', 'text' => 'move down', 'method' => 'downward'],
                    ['icon' => 'arrow_upward', 'text' => 'move up', 'method' => 'upward'],
                    ['icon' => 'folder', 'text' => 'open permission', 'method' => 'permission']
                ],

                /**
                 * filters
                 * ['text' => 'filter none', 'icon' => 'select_all', 'value' => null],
                 * ['text' => 'filter some', 'icon' => 'icon', 'value' => ['filterOn' => 'field', 'filterBy' => 'text']],
                 */
                'filters' => [],

                'headers' => [
                    ['text' => 'Name', 'value' => 'name'],
                    ['text' => 'Path', 'value' => 'path'],
                    ['text' => 'Maps', 'value' => 'maps'],
                    ['text' => 'Apps', 'value' => 'apps'],
                    ['text' => 'Icon', 'value' => 'icon_icon', 'class' => 'field-icon'],
                    ['text' => 'Menu', 'value' => 'menu_icon', 'class' => 'field-icon'],
                    ['text' => 'Updated', 'value' => 'updated_at', 'class' => 'field-datetime'],
                ],

                /**
                 * permissions
                 * ['create' => bool, 'update' => bool, 'delete' => bool, 'restore' => bool, 'forceDelete' => bool]
                 */
                'permissions' => $request->user()->permissionsOnModule('moui-module'),

                'record' => [
                    'id' => null,
                    'name' => null,
                    'maps' => null,
                    'path' => null,
                    'apps' => null,
                    'icon' => null,
                    'menu' => false,
                ]
            ]
        ];
    }
}
