<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\PasswordCollection;
use App\Http\Resources\PasswordResource;
use App\Models\Password;
use Illuminate\Http\Request;

class PasswordController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Password::class);

        return new PasswordCollection(
            Password::filterOn($request)->paginate($request->itemsPerPage)
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Password  $password
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('update', $request->user());

        $this->validate($request, [
            'old_password' => 'required|old_password',
            'password' => 'confirmed|max:8|different:old_password',
        ]);

        return Password::updateRecord($request, $request->user());
    }
}
