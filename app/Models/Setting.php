<?php

namespace App\Models;

use App\Http\Resources\SettingResource;
use App\Traits\HasMeta;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Setting extends Model
{
    use HasMeta, SoftDeletes;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'meta' => 'array'
    ];

    /**
     * Undocumented function
     *
     * @param [type] $value
     * @return void
     */
    public function resolveRouteBinding($value)
    {
        return $this->where($this->getRouteKeyName(), $value)->first();
    }

    /**
     * Scope for combo
     */
    public function scopeFetchCombo($query)
    {
        return $query->select('name AS text', 'id AS value')->get();
    }

    /**
     * Scope for filter
     */
    public function scopeFilterOn($query, $request)
    {
        $sortBy = strtolower($request->sortBy) ?: null;
        $sortAz = $request->sortDesc ? 'desc' : 'asc';
        $findBy = strtolower($request->findBy) ?: null;
        $findOn = strtolower($request->findOn) ?: null;

        $trashed = $request->trashed ?: false;
        $filterOn = strtolower($request->filterOn) ?: null;
        $filterBy = strtolower($request->filterBy) ?: null;

        $mquery = $query;

        if ($trashed) {
            $mquery = $mquery->onlyTrashed();
        }

        if ($findBy) {
            $mquery = $mquery->whereRaw("LOWER({$findOn}) LIKE ?", ["%{$findBy}%"]);
        }

        if ($filterBy) {
            $mquery = $mquery->whereRaw("{$filterOn} = ?", [$filterBy]);
        }

        if ($sortBy) {
            $mquery = $mquery->orderBy($sortBy, $sortAz);
        } else {
            $mquery = $mquery->orderBy('id', $sortAz);
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
            // ...
            $model->save();

            DB::commit();

            return new SettingResource($model);
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
            if ($request->has('background')) {
                $model->background = $request->background;
            }

            if ($request->has('logo')) {
                $model->logo = $request->logo;
            }

            if ($request->has('company')) {
                $model->company = $request->company;
            }

            if ($request->has('companyExtended')) {
                $model->companyExtended = $request->companyExtended;
            }

            if ($request->has('product')) {
                $model->product = $request->product;
            }

            if ($request->has('productExtended')) {
                $model->productExtended = $request->productExtended;
            }

            if ($request->has('slogan')) {
                $model->slogan = $request->slogan;
            }

            if ($request->has('description')) {
                $model->description = $request->description;
            }

            $model->save();

            DB::commit();

            return new SettingResource($model);
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

    /**
     * Undocumented function
     *
     * @param [type] $model
     * @return void
     */
    public static function restoreRecord($model)
    {
        DB::beginTransaction();

        try {
            (new static)->withTrashed()->whereRaw("id = {$model}")->restore();

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

    /**
     * Undocumented function
     *
     * @param [type] $model
     * @return void
     */
    public static function forceDeleteRecord($model)
    {
        DB::beginTransaction();

        try {
            (new static)->withTrashed()->whereRaw("id = {$model}")->forceDelete();

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
