<?php

namespace App\Models;

use App\Http\Resources\ProfileResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Profile extends Model
{
    use SoftDeletes;

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'users';

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
        $mquery = $query->where('id', $request->user()->id);
        $mquery = $mquery->orderBy('id', 'asc');

        return $mquery;
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

            return new ProfileResource($model);
        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }
}
