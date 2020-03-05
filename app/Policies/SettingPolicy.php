<?php

namespace App\Policies;

use App\Models\Setting;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class SettingPolicy
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
     * Determine whether the user can view the setting.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function view(User $user, Setting $setting)
    {
        return $user->hasPermission('view-moui-setting');
    }

    /**
     * Determine whether the user can view the setting.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-setting');
    }

    /**
     * Determine whether the user can create settings.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-setting');
    }

    /**
     * Determine whether the user can update the setting.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function update(User $user, Setting $setting)
    {
        return $user->hasPermission('update-moui-setting');
    }

    /**
     * Determine whether the user can delete the setting.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function delete(User $user, Setting $setting)
    {
        return $user->hasPermission('delete-moui-setting');
    }

    /**
     * Determine whether the user can restore the setting.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function restore(User $user, Setting $setting)
    {
        return $user->hasPermission('restore-moui-setting');
    }

    /**
     * Determine whether the user can permanently delete the setting.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Setting  $setting
     * @return mixed
     */
    public function forceDelete(User $user, Setting $setting)
    {
        return $user->hasPermission('force-delete-moui-setting');
    }
}
