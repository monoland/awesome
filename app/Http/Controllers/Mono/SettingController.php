<?php

namespace App\Http\Controllers\Mono;

use App\Http\Controllers\Controller;
use App\Http\Resources\SettingResource;
use App\Models\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        // $this->authorize('viewAny', Setting::class);

        return new SettingResource(Setting::where('name', $request->name)->first());
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request, Setting $setting)
    {
        // $this->authorize('update', $setting);

        // $this->validate($request, []);

        return Setting::updateRecord($request, $setting);
    }
}
