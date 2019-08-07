<?php

namespace App\Http\Controllers\Mono;

use App\Models\User;
use App\Models\Setting;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Http\Resources\SettingResource;

class WebController extends Controller
{
    /**
     * Undocumented function
     *
     * @return void
     */
    public function index()
    {
        return view('default');
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
    public function profile(Request $request)
    {
        return User::updateRecord($request, $request->user());
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function password(Request $request)
    {
        $this->validate($request, [
            'old_password' => 'required|old_password',
            'password' => 'confirmed|max:8|different:old_password'
        ]);

        return User::updatePassword($request, $request->user());
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function company(Request $request)
    {
        return new SettingResource(Setting::find('company'));
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function menus(Request $request)
    {
        return response()->json([
            ['type' => 'item', 'icon' => 'dashboard', 'text' => 'Beranda', 'to' => ['name' => 'home']],
            ['type' => 'subheader', 'text' => 'Master', 'class' => 'mt-2'],
            ['type' => 'item', 'icon' => 'filter_none', 'text' => 'Dokumen', 'to' => ['name' => 'document']],
            ['type' => 'subheader', 'text' => 'Utilitas', 'class' => 'mt-2'],
            ['type' => 'item', 'icon' => 'people', 'text' => 'Pengguna', 'to' => ['name' => 'user']],
            ['type' => 'item', 'icon' => 'whatshot', 'text' => 'OAuth Klien', 'to' => ['name' => 'client']],
        ]);
    }
}
