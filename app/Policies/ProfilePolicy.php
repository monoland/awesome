<?php

namespace App\Policies;

use App\Models\Profile;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProfilePolicy
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
     * Determine whether the user can view the profile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Profile  $profile
     * @return mixed
     */
    public function view(User $user, Profile $profile)
    {
        return $user->hasPermission('view-moui-profile');
    }

    /**
     * Determine whether the user can view the profile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Profile  $profile
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-profile');
    }

    /**
     * Determine whether the user can create profiles.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-profile');
    }

    /**
     * Determine whether the user can update the profile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Profile  $profile
     * @return mixed
     */
    public function update(User $user, Profile $profile)
    {
        return $user->hasPermission('update-moui-profile');
    }

    /**
     * Determine whether the user can delete the profile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Profile  $profile
     * @return mixed
     */
    public function delete(User $user, Profile $profile)
    {
        return $user->hasPermission('delete-moui-profile');
    }

    /**
     * Determine whether the user can restore the profile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Profile  $profile
     * @return mixed
     */
    public function restore(User $user, Profile $profile)
    {
        return $user->hasPermission('restore-moui-profile');
    }

    /**
     * Determine whether the user can permanently delete the profile.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Profile  $profile
     * @return mixed
     */
    public function forceDelete(User $user, Profile $profile)
    {
        return $user->hasPermission('force-delete-moui-profile');
    }
}
