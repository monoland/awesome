<?php

namespace App\Http\Controllers\Apps;

use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\WebInfoResource;

class WebController extends Controller
{
    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        return view('monoland');
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function menu(Request $request)
    {
        $menus = [
            ['type' => 'item', 'icon' => 'dashboard', 'text' => 'Beranda', 'to' => ['name' => 'backend-home']],
            // master
            ['type' => 'subheader', 'text' => 'Master', 'class' => 'mt-2'],
            ['type' => 'item', 'icon' => 'people', 'text' => 'User', 'to' => ['name' => 'backend-user']],

            ['type' => 'subheader', 'text' => 'Utilitas', 'class' => 'mt-2'],
        ];

        return response()->json($menus);
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function user(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function webinfo(Request $request)
    {
        return new WebInfoResource(Setting::where('name', 'webinfo')->first());
    }
}
