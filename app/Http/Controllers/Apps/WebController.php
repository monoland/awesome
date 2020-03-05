<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\InfoResource;
use App\Http\Resources\ProfileResource;
use App\Models\Setting;
use Illuminate\Http\Request;

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
    public function menus(Request $request)
    {
        return response()->json($request->user()->modules());
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function user(Request $request)
    {
        return new ProfileResource($request->user());
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function info(Request $request)
    {
        return new InfoResource(Setting::where('name', 'web-info')->first());
    }
}
