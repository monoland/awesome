<?php

namespace App\Policies;

use App\Models\Notification;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class NotificationPolicy
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
     * Determine whether the user can view the notification.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notification  $notification
     * @return mixed
     */
    public function view(User $user, Notification $notification)
    {
        return $user->hasPermission('view-moui-notification');
    }

    /**
     * Determine whether the user can view the notification.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notification  $notification
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-notification');
    }

    /**
     * Determine whether the user can create notifications.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-notification');
    }

    /**
     * Determine whether the user can update the notification.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notification  $notification
     * @return mixed
     */
    public function update(User $user, Notification $notification)
    {
        return $user->hasPermission('update-moui-notification');
    }

    /**
     * Determine whether the user can delete the notification.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notification  $notification
     * @return mixed
     */
    public function delete(User $user, Notification $notification)
    {
        return $user->hasPermission('delete-moui-notification');
    }

    /**
     * Determine whether the user can restore the notification.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notification  $notification
     * @return mixed
     */
    public function restore(User $user, Notification $notification)
    {
        return $user->hasPermission('restore-moui-notification');
    }

    /**
     * Determine whether the user can permanently delete the notification.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Notification  $notification
     * @return mixed
     */
    public function forceDelete(User $user, Notification $notification)
    {
        return $user->hasPermission('force-delete-moui-notification');
    }
}
