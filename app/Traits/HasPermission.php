<?php

namespace App\Traits;

use App\Models\Module;
use App\Models\Permission;
use Illuminate\Support\Str;
use RecursiveArrayIterator;
use RecursiveIteratorIterator;

trait HasPermission
{
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'roles_has_permissions');
    }

    public function assignPermission(...$permissions)
    {
        $permissions = $this->convertToPermissionIds($permissions);

        if ($permissions->count() > 0) {
            $this->permissions()->syncWithoutDetaching($permissions);

            return $this;
        }

        return false;
    }

    private function convertToPermissionIds($permissions)
    {
        $buffers = array_map(function ($permission) {
            if (is_numeric($permission)) {
                $model = Permission::find($permission);
            } elseif (is_string($permission)) {
                if (Str::contains($permission, '*')) {
                    $module = Module::firstWhere('slug', str_replace('*-', '', $permission));
                    $models = $module->permissions->pluck('id');

                    return $models->toArray();
                } else {
                    $model = Permission::firstWhere('slug', $permission);
                }
            }

            if (isset($model)) {
                return $model->id;
            }
        }, $permissions);

        $buffers = new RecursiveIteratorIterator(new RecursiveArrayIterator($buffers));
        $permissions = [];

        foreach ($buffers as $buffer) {
            array_push($permissions, $buffer);
        }

        return collect($permissions);
    }
}
