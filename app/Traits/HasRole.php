<?php

namespace App\Traits;

use App\Http\Resources\ModuleList;
use App\Models\Module;
use App\Models\Role;
use Illuminate\Support\Str;

trait HasRole
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function role()
    {
        return $this->belongsTo(Role::class);
    }

    /**
     * Undocumented function
     *
     * @param [type] $role
     * @return boolean
     */
    public function hasRole($role): bool
    {
        if (is_numeric($role)) {
            return $this->role_id === $role;
        } elseif (is_string($role)) {
            return $this->role->slug === strtolower($role);
        }
    }

    /**
     * Undocumented function
     *
     * @param [type] $role
     * @return void
     */
    public function assignRole($role)
    {
        if (is_numeric($role)) {
            $model = Role::find($role);
        } elseif (is_string($role)) {
            $model = Role::firstWhere('slug', strtolower($role));
        }

        if (isset($model)) {
            $this->update(['role_id' => $model->id]);

            return $this;
        }

        return false;
    }

    /**
     * Undocumented function
     *
     * @return void
     */
    public function modules()
    {
        return ModuleList::collection($this->role->modules);
    }

    /**
     * Undocumented function
     *
     * @param [type] $permission
     * @return boolean
     */
    public function hasPermission($permission)
    {
        if (is_numeric($permission)) {
            return $this->role->permissions()->where('id', $permission)->count() > 0;
        } elseif (is_string($permission)) {
            return $this->role->permissions()->where('slug', $permission)->count() > 0;
        }
    }

    /**
     * Undocumented function
     *
     * @param [type] ...$permissions
     * @return boolean
     */
    public function hasAnyPermission(...$permissions): bool
    {
        foreach ($permissions as $permission) {
            if ($this->hasPermission($permission)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Undocumented function
     *
     * @param [type] $module
     * @return void
     */
    public function permissionsOnModule($module)
    {
        $permissions = [];
        $module = (Module::firstWhere('slug', $module));

        if (optional($module)->id) {
            foreach ($this->role->permissions()->where('module_id', $module->id)->pluck('slug') as $permission) {
                $permission = Str::camel(str_replace("-{$module->slug}", '', $permission));

                if (in_array($permission, ['create', 'update', 'delete', 'restore', 'forceDelete'])) {
                    $permissions[$permission] = true;
                }
            }
        }

        return $permissions;
    }
}
