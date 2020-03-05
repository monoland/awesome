<?php

namespace App\Http\Resources;

use App\Models\Role;
use Illuminate\Http\Resources\Json\ResourceCollection;

class UserCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return UserResource::collection($this->collection);
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
                'icon' => 'supervisor_account',

                'title' => 'Account',

                'softDeletes' => $request->user()->hasAnyPermission('restore-moui-account', 'force-delete-moui-account'),

                'findOn' => 'name',

                'combos' => [
                    'roles' => Role::fetchCombo()
                ],

                /**
                 * filters
                 * ['text' => 'filter none', 'icon' => 'select_all', 'value' => null],
                 * ['text' => 'filter some', 'icon' => 'icon', 'value' => ['filterOn' => 'field', 'filterBy' => 'text']],
                 */
                'filters' => [],

                'headers' => [
                    ['text' => 'Name', 'value' => 'name'],
                    ['text' => 'Email', 'value' => 'email'],
                    ['text' => 'Theme', 'value' => 'theme'],
                    ['text' => 'Updated', 'value' => 'updated_at', 'class' => 'field-datetime'],
                ],

                /**
                 * permissions
                 * ['create' => bool, 'update' => bool, 'delete' => bool, 'restore' => bool, 'forceDelete' => bool]
                 */
                'permissions' => $request->user()->permissionsOnModule('moui-account'),

                'record' => [
                    'id' => null,
                    'name' => null,
                    'email' => null,
                    'theme' => null,
                    'active' => false,
                    'role' => null
                ]
            ]
        ];
    }
}
