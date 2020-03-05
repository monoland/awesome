<?php

namespace App\Models;

use App\Http\Resources\ModuleResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Kalnoy\Nestedset\NodeTrait;
use Illuminate\Support\Str;

class Module extends Model
{
    use NodeTrait, SoftDeletes;

    /**
     * Undocumented function
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::deleting(function ($module) {
            $module->permissions()->delete();
        });

        static::deleted(function ($module) {
            if ($module->isForceDeleting()) {
                $module->permissions()->forceDelete();
            }
        });

        static::restoring(function ($module) {
            $module->permissions()->restore();
        });
    }

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
     * Undocumented function
     *
     * @return void
     */
    public function permissions()
    {
        return $this->hasMany(Permission::class);
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
            $mquery = $mquery->orderBy('_lft', $sortAz);
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
            $model->slug = Str::slug($request->apps . ' ' . $request->name);
            $model->maps = $request->maps;
            $model->path = $request->path;
            $model->apps = $request->apps;
            $model->icon = $request->icon;
            $model->menu = $request->menu;
            $model->save();

            $model->permissions()->saveMany([
                new Permission(['name' => 'view', 'slug' => Str::slug('view ' . $request->apps . ' ' . $request->name)]),
                new Permission(['name' => 'viewAny', 'slug' => Str::slug('view-any ' . $request->apps . ' ' . $request->name)]),
                new Permission(['name' => 'create', 'slug' => Str::slug('create ' . $request->apps . ' ' . $request->name)]),
                new Permission(['name' => 'update', 'slug' => Str::slug('update ' . $request->apps . ' ' . $request->name)]),
                new Permission(['name' => 'delete', 'slug' => Str::slug('delete ' . $request->apps . ' ' . $request->name)]),
                new Permission(['name' => 'restore', 'slug' => Str::slug('restore ' . $request->apps . ' ' . $request->name)]),
                new Permission(['name' => 'forceDelete', 'slug' => Str::slug('force-delete ' . $request->apps . ' ' . $request->name)]),
            ]);

            DB::commit();

            return new ModuleResource($model);
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
            $model->slug = Str::slug($request->apps . ' ' . $request->name);
            $model->maps = $request->maps;
            $model->path = $request->path;
            $model->apps = $request->apps;
            $model->icon = $request->icon;
            $model->menu = $request->menu;
            $model->save();

            DB::commit();

            return new ModuleResource($model);
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
