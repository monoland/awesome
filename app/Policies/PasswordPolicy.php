<?php

namespace App\Policies;

use App\Models\Password;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class PasswordPolicy
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
     * Determine whether the user can view the password.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Password  $password
     * @return mixed
     */
    public function view(User $user, Password $password)
    {
        return $user->hasPermission('view-moui-password');
    }

    /**
     * Determine whether the user can view the password.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Password  $password
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-password');
    }

    /**
     * Determine whether the user can create passwords.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-password');
    }

    /**
     * Determine whether the user can update the password.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Password  $password
     * @return mixed
     */
    public function update(User $user, Password $password)
    {
        return $user->hasPermission('update-moui-password');
    }

    /**
     * Determine whether the user can delete the password.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Password  $password
     * @return mixed
     */
    public function delete(User $user, Password $password)
    {
        return $user->hasPermission('delete-moui-password');
    }

    /**
     * Determine whether the user can restore the password.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Password  $password
     * @return mixed
     */
    public function restore(User $user, Password $password)
    {
        return $user->hasPermission('restore-moui-password');
    }

    /**
     * Determine whether the user can permanently delete the password.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Password  $password
     * @return mixed
     */
    public function forceDelete(User $user, Password $password)
    {
        return $user->hasPermission('force-delete-moui-password');
    }
}
