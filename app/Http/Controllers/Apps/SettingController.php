<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingCollection;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Setting::class);

        return new SettingCollection(
            Setting::filterOn($request)->paginate($request->itemsPerPage)
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
        $this->authorize('create', Setting::class);

        $this->validate($request, []);

        return Setting::storeRecord($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Setting $setting)
    {
        $this->authorize('view', $setting);

        return new SettingResource($setting);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Setting $setting)
    {
        $this->authorize('update', $setting);

        $this->validate($request, []);

        return Setting::updateRecord($request, $setting);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting)
    {
        $this->authorize('delete', $setting);

        return Setting::destroyRecord($setting);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function restore(Setting $setting)
    {
        $this->authorize('restore', Setting::class);

        return Setting::restoreRecord($setting);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\Setting $setting
     * @return \Illuminate\Http\Response
     */
    public function forceDelete(Setting $setting)
    {
        $this->authorize('forceDelete', Setting::class);

        return Setting::forceDeleteRecord($setting);
    }
}
