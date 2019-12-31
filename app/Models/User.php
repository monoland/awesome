<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Laravel\Passport\HasApiTokens;
use App\Http\Resources\AccountResource;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function hasRole($authent): bool
    {
        return $this->authent === $authent;
    }

    /**
     * Undocumented function
     *
     * @return void
     */
    public function userable()
    {
        return $this->morphTo();
    }

    /**
     * Undocumented function
     *
     * @param [type] $query
     * @return void
     */
    public function scopeFetchCombo($query)
    {
        return $query->select('name AS text', 'id AS value')->get();
    }

    /**
     * Undocumented function
     *
     * @param [type] $query
     * @param [type] $request
     * @return void
     */
    public function scopeFilterOn($query, $request)
    {
        $sortBy = strtolower($request->sortBy) ?: null;
        $sortAz = $request->sortDesc ? 'desc' : 'asc';
        $findBy = strtolower($request->findBy) ?: null;
        $findIn = strtolower($request->findIn) ?: null;

        $mquery = $query;

        if ($findBy) {
            $mquery = $mquery->whereRaw("LOWER({$findIn}) LIKE '%{$findBy}%'");
        }

        if ($sortBy) {
            $mquery = $mquery->orderBy($sortBy, $sortAz);
        }

        return $mquery;
    }

    /**
     * The store function
     *
     * @param Request $request
     * @return void
     */
    public static function storeRecord(Request $request)
    {
        DB::beginTransaction();

        try {
            $model = new static;
            $model->name = $request->name;
            $model->email = $request->email;
            $model->password = Hash::make('12345678');
            $model->authent = 'superadmin';
            $model->avatar = $request->avatar;
            $model->background = $request->background;
            $model->theme = $request->theme;
            $model->save();

            DB::commit();

            return new AccountResource($model);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * The update function
     *
     * @param Request $request
     * @param [type] $model
     * @return void
     */
    public static function updateRecord(Request $request, $model)
    {
        DB::beginTransaction();

        try {
            $model->name = $request->name;
            $model->email = $request->email;
            $model->avatar = $request->avatar;
            $model->background = $request->background;
            $model->theme = $request->theme;
            $model->save();

            DB::commit();

            return new AccountResource($model);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    public static function updatePassword(Request $request, $model)
    {
        DB::beginTransaction();

        try {
            $model->fill([
                'password' => Hash::make($request->password),
            ])->save();

            DB::commit();

            return response()->json([
                'success' => true
            ], 200);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * The destroy function
     *
     * @param [type] $model
     * @return void
     */
    public static function destroyRecord($model)
    {
        DB::beginTransaction();

        try {
            $model->delete();

            DB::commit();

            return response()->json(['success' => true]);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
