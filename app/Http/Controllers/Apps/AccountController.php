<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserCollection;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class AccountController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', User::class);

        return new UserCollection(
            User::filterOn($request)->paginate($request->itemsPerPage)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', User::class);

        $this->validate($request, []);

        return User::storeRecord($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        $this->authorize('view', $user);

        return new UserResource($user);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user)
    {
        $this->authorize('update', $user);

        $this->validate($request, []);

        return User::updateRecord($request, $user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user)
    {
        $this->authorize('delete', $user);

        return User::destroyRecord($user);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function restore(User $user)
    {
        $this->authorize('restore', User::class);

        return User::restoreRecord($user);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\User $user
     * @return \Illuminate\Http\Response
     */
    public function forceDelete(User $user)
    {
        $this->authorize('forceDelete', User::class);

        return User::forceDeleteRecord($user);
    }
}
