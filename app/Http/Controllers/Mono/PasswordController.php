<?php

namespace App\Http\Controllers\Mono;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class PasswordController extends Controller
{
    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function index(Request $request)
    {
        return new UserResource($request->user());
    }

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public function update(Request $request)
    {
        $this->validate($request, [
            'old_password' => 'required|old_password',
            'password' => 'confirmed|max:8|different:old_password',
        ]);

        return User::updatePassword($request, $request->user());
    }
}
