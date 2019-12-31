<?php

namespace App\Models;

use App\Traits\HasMeta;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Resources\SettingResource;
use Illuminate\Database\Eloquent\Model;

class Setting extends Model
{
    use HasMeta;

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'meta' => 'array'
    ];

    /**
     * Get the route key for the model.
     *
     * @return void
     */
    public function getRouteKeyName()
    {
        return 'name';
    }

    /**
     * Relationship
     */

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
            // ...
            // $model->save();

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
            if ($model->name === 'web-info') {
                $model->company = $request->company;
                $model->companyExtended = $request->companyExtended;
                $model->product = $request->product;
                $model->productExtended = $request->productExtended;
                $model->slogan = $request->slogan;
                $model->description = $request->description;
                $model->logo = $request->logo;
                $model->background = $request->background;
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
}
