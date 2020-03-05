<?php

namespace App\Models;

use App\Http\Resources\DocumentResource;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class Document extends Model
{
    use SoftDeletes;

    protected $chunk_inpt = 'file';
    protected $chunk_maxs = 400;
    protected $chunk_size = 250000;
    protected $chunk_trgt = 'uploads';

    /**
     * Undocumented function
     *
     * @return void
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Undocumented function
     *
     * @param [type] $value
     * @return void
     */
    public function resolveRouteBinding($value)
    {
        return $this->withTrashed()->where('slug', $value)->firstOrFail();
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
     * Undocumented function
     *
     * @param [type] $uuid
     * @return void
     */
    public function cleanChunks($path)
    {
        try {
            $dirx = new \RecursiveDirectoryIterator($path, \RecursiveDirectoryIterator::SKIP_DOTS);
            $files = new \RecursiveIteratorIterator($dirx, \RecursiveIteratorIterator::CHILD_FIRST);

            foreach ($files as $file) {
                if ($file->isDir()) {
                    rmdir($file->getRealPath());
                } else {
                    unlink($file->getRealPath());
                }
            }

            rmdir($path);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * The store function
     *
     * @param Request $request
     * @return void
     */
    public static function storeRecord(Request $request)
    {
        $model = new static;

        $file = $request->file($model->chunk_inpt);


        if ($request->has('doctype') && ($request->doctype === 'moui-logo' || $request->doctype === 'moui-background')) {
            $name = sha1($request->uuid) . '.' . File::extension($request->fileName);
            $path = storage_path('app' . DIRECTORY_SEPARATOR . 'public');
            $drve = 'public';
        } else {
            $name = sha1($request->uuid);
            $path = storage_path($model->chunk_trgt . DIRECTORY_SEPARATOR . sha1($request->user()->id));
            $drve = $model->chunk_trgt;
        }

        $trgt = $path . DIRECTORY_SEPARATOR . $name;
        $temp = $path . DIRECTORY_SEPARATOR . 'temp-' . $name;

        try {
            if ($request->chunkMaxs > $model->chunk_maxs || $request->chunkCrsz > $model->chunk_crsz) {
                return response()->json([
                    'success' => false,
                    'message' => 'File or chunk size is too large.',
                    'preventRetry' => true,
                ], 500);
            }

            // check it's first chunk
            if ((int) $request->chunkNumb === 1) {
                if (!File::isDirectory($path)) {
                    File::makeDirectory($path, 0775, true);
                }

                if (File::exists($trgt)) {
                    (new static)->where('slug', $name)->forceDelete();

                    unlink($trgt);
                }
            }

            if ($drve === 'public') {
                $file->storeAs('temp-' . $name, $request->chunkNumb, $drve);
            } else {
                $file->storeAs(sha1($request->user()->id) . DIRECTORY_SEPARATOR . 'temp-' . $name, $request->chunkNumb, $drve);
            }

            if ((int) $request->chunkNumb < (int) $request->chunkMaxs) {
                return response()->json([
                    'success' => true
                ], 200);
            } else if ((int) $request->chunkNumb === (int) $request->chunkMaxs) {
                DB::beginTransaction();

                $stream = fopen($trgt, 'wb');

                for ($i = 1; $i <= $request->chunkMaxs; ++$i) {
                    $chunk = fopen($temp . DIRECTORY_SEPARATOR . $i, 'rb');
                    stream_copy_to_stream($chunk, $stream);
                    fclose($chunk);
                }

                fclose($stream);

                $model->cleanChunks($temp);

                $model->name = $request->fileName;
                $model->slug = $name;
                $model->byte = File::size($trgt);
                $model->extn = File::extension($request->fileName);
                $model->type = File::type($trgt);
                $model->mime = File::mimeType($trgt) ?: $request->mimeType;
                $model->drve = $drve;
                $model->kind = $request->doctype ?: 'default';

                $request->user()->documents()->save($model);

                DB::commit();

                return new DocumentResource($model);
            }
        } catch (\Exception $e) {
            $model->cleanChunks($temp);

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

            return new DocumentResource($model);
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
