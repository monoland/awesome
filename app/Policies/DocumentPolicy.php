<?php

namespace App\Policies;

use App\Models\Document;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;

class DocumentPolicy
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
     * Determine whether the user can view the document.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Document  $document
     * @return mixed
     */
    public function view(User $user, Document $document)
    {
        return $user->hasPermission('view-moui-document');
    }

    /**
     * Determine whether the user can view the document.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Document  $document
     * @return mixed
     */
    public function viewAny(User $user)
    {
        return $user->hasPermission('view-any-moui-document');
    }

    /**
     * Determine whether the user can create documents.
     *
     * @param  \App\Models\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->hasPermission('create-moui-document');
    }

    /**
     * Determine whether the user can update the document.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Document  $document
     * @return mixed
     */
    public function update(User $user, Document $document)
    {
        return $user->hasPermission('update-moui-document');
    }

    /**
     * Determine whether the user can delete the document.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Document  $document
     * @return mixed
     */
    public function delete(User $user, Document $document)
    {
        return $user->hasPermission('delete-moui-document');
    }

    /**
     * Determine whether the user can restore the document.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Document  $document
     * @return mixed
     */
    public function restore(User $user, Document $document)
    {
        return $user->hasPermission('restore-moui-document');
    }

    /**
     * Determine whether the user can permanently delete the document.
     *
     * @param  \App\Models\User  $user
     * @param  \App\Models\Document  $document
     * @return mixed
     */
    public function forceDelete(User $user, Document $document)
    {
        return $user->hasPermission('force-delete-moui-document');
    }
}
