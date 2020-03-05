<?php

namespace App\Policies;

use App\Models\Client;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class ClientPolicy
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
     * Determine whether the user can view the client.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function view(User $user, Client $client)
    {
        return $user->hasPermission('view-moui-client');
    }

    /**
     * Determine whether the user can view the client.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-client');
    }

    /**
     * Determine whether the user can create clients.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-client');
    }

    /**
     * Determine whether the user can update the client.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function update(User $user, Client $client)
    {
        return $user->hasPermission('update-moui-client');
    }

    /**
     * Determine whether the user can delete the client.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function delete(User $user, Client $client)
    {
        return $user->hasPermission('delete-moui-client');
    }

    /**
     * Determine whether the user can restore the client.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function restore(User $user, Client $client)
    {
        return $user->hasPermission('restore-moui-client');
    }

    /**
     * Determine whether the user can permanently delete the client.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Client  $client
     * @return mixed
     */
    public function forceDelete(User $user, Client $client)
    {
        return $user->hasPermission('force-delete-moui-client');
    }
}
