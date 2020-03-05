<?php

namespace App\Models;

use App\Http\Resources\AccountResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Account extends Model
{
    use SoftDeletes;
    
    /**
     * Undocumented function
     *
     * @param [type] $value
     * @return void
     */
    public function resolveRouteBinding($value)
    {
        return $this->withTrashed()->where($this->getRouteKeyName(), $value)->firstOrFail();
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
            // ...
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
            $model->restore();

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
            $model->forceDelete();

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
