<?php

namespace App\Policies;

use App\Models\Module;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ModulePolicy
{
    use HandlesAuthorization;

    /**
     * filter function
     *
     * @param [type] $user
     * @param [type] $ability
     * @return void
     */
    public function before($user, $ability)
    {
        if ($user->hasRole('superadmin')) {
            return true;
        }
    }

    /**
     * Determine whether the user can view the module.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Module  $module
     * @return mixed
     */
    public function view(User $user, Module $module)
    {
        return $user->hasPermission('view-moui-module');
    }

    /**
     * Determine whether the user can view the module.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Module  $module
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-module');
    }

    /**
     * Determine whether the user can create modules.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-module');
    }

    /**
     * Determine whether the user can update the module.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Module  $module
     * @return mixed
     */
    public function update(User $user, Module $module)
    {
        return $user->hasPermission('update-moui-module');
    }

    /**
     * Determine whether the user can delete the module.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Module  $module
     * @return mixed
     */
    public function delete(User $user, Module $module)
    {
        return $user->hasPermission('delete-moui-module');
    }

    /**
     * Determine whether the user can restore the module.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Module  $module
     * @return mixed
     */
    public function restore(User $user, Module $module)
    {
        return $user->hasPermission('restore-moui-module');
    }

    /**
     * Determine whether the user can permanently delete the module.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Module  $module
     * @return mixed
     */
    public function forceDelete(User $user, Module $module)
    {
        return $user->hasPermission('force-delete-moui-module');
    }
}
