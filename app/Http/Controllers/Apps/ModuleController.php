<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\ModuleCollection;
use App\Http\Resources\ModuleResource;
use App\Models\Module;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Module::class);

        return new ModuleCollection(
            Module::filterOn($request)->paginate($request->itemsPerPage)
        );
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @param Module $module
     * @return void
     */
    public function movedown(Request $request, Module $module)
    {
        if ($module->down()) {
            return ModuleResource::collection(Module::filterOn($request)->paginate($request->itemsPerPage));
        }
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @param Module $module
     * @return void
     */
    public function moveup(Request $request, Module $module)
    {
        if ($module->up()) {
            return ModuleResource::collection(Module::filterOn($request)->paginate($request->itemsPerPage));
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Module::class);

        $this->validate($request, []);

        return Module::storeRecord($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function show(Module $module)
    {
        $this->authorize('view', $module);

        return new ModuleResource($module);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Module $module)
    {
        $this->authorize('update', $module);

        $this->validate($request, []);

        return Module::updateRecord($request, $module);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Module $module
     * @return \Illuminate\Http\Response
     */
    public function destroy(Module $module)
    {
        $this->authorize('delete', $module);

        return Module::destroyRecord($module);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\Module  $module
     * @return \Illuminate\Http\Response
     */
    public function restore(Module $module)
    {
        $this->authorize('restore', Module::class);

        return Module::restoreRecord($module);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\Module $module
     * @return \Illuminate\Http\Response
     */
    public function forceDelete(Module $module)
    {
        $this->authorize('forceDelete', Module::class);

        return Module::forceDeleteRecord($module);
    }
}
