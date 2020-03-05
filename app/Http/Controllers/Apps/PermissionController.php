<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\PermissionCollection;
use App\Models\Module;
use App\Models\Permission;
use Illuminate\Http\Request;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request, Module $module)
    {
        $this->authorize('viewAny', Permission::class);

        return new PermissionCollection(
            $module->permissions()->filterOn($request)->paginate($request->itemsPerPage)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request, Module $module)
    {
        $this->authorize('create', Permission::class);

        $this->validate($request, []);

        return Permission::storeRecord($request, $module);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Module  $module
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Module $module, Permission $permission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Module  $module
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Module $module, Permission $permission)
    {
        $this->authorize('update', $permission);

        $this->validate($request, []);

        return Permission::updateRecord($request, $permission);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Module  $module
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Module $module, Permission $permission)
    {
        $this->authorize('delete', $permission);

        return Permission::destroyRecord($permission);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function restore(Module $module, $permission)
    {
        $this->authorize('restore', Permission::class);

        return Permission::restoreRecord($permission);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\Permission $permission
     * @return \Illuminate\Http\Response
     */
    public function forceDelete(Module $module, $permission)
    {
        $this->authorize('forceDelete', Permission::class);

        return Permission::forceDeleteRecord($permission);
    }
}
