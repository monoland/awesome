<?php

namespace App\Policies;

use App\Models\Permission;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PermissionPolicy
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
     * Determine whether the user can view the permission.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Permission  $permission
     * @return mixed
     */
    public function view(User $user, Permission $permission)
    {
        return $user->hasPermission('view-moui-permission');
    }

    /**
     * Determine whether the user can view the permission.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Permission  $permission
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-permission');
    }

    /**
     * Determine whether the user can create permissions.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-permission');
    }

    /**
     * Determine whether the user can update the permission.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Permission  $permission
     * @return mixed
     */
    public function update(User $user, Permission $permission)
    {
        return $user->hasPermission('update-moui-permission');
    }

    /**
     * Determine whether the user can delete the permission.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Permission  $permission
     * @return mixed
     */
    public function delete(User $user, Permission $permission)
    {
        return $user->hasPermission('delete-moui-permission');
    }

    /**
     * Determine whether the user can restore the permission.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Permission  $permission
     * @return mixed
     */
    public function restore(User $user, Permission $permission)
    {
        return $user->hasPermission('restore-moui-permission');
    }

    /**
     * Determine whether the user can permanently delete the permission.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Permission  $permission
     * @return mixed
     */
    public function forceDelete(User $user, Permission $permission)
    {
        return $user->hasPermission('force-delete-moui-permission');
    }
}
