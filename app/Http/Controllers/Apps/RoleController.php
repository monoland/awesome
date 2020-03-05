<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\RoleCollection;
use App\Http\Resources\RoleResource;
use App\Models\Role;
use Illuminate\Http\Request;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Role::class);

        return new RoleCollection(
            Role::filterOn($request)->paginate($request->itemsPerPage)
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
        $this->authorize('create', Role::class);

        $this->validate($request, []);

        return Role::storeRecord($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function show(Role $role)
    {
        $this->authorize('view', $role);

        return new RoleResource($role);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $this->authorize('update', $role);

        $this->validate($request, []);

        return Role::updateRecord($request, $role);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function destroy(Role $role)
    {
        $this->authorize('delete', $role);

        return Role::destroyRecord($role);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\Role  $role
     * @return \Illuminate\Http\Response
     */
    public function restore($role)
    {
        $this->authorize('restore', Role::class);

        return Role::restoreRecord($role);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\Role $role
     * @return \Illuminate\Http\Response
     */
    public function forceDelete($role)
    {
        $this->authorize('forceDelete', Role::class);

        return Role::forceDeleteRecord($role);
    }
}
