<?php

namespace App\Models;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class Media
{
    protected $chunk_inpt = 'fileUpload';
    protected $chunk_fldr = 'chunks';
    protected $chunk_maxi = 400;
    protected $chunk_mxsz = 250000;
    protected $chunk_trgt = 'app' . DIRECTORY_SEPARATOR . 'public';

    /**
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public static function chunkMedia(Request $request)
    {
        $handle = new static();

        $chunk_uuid = $request->uuid;
        $chunk_indx = (int) $request->partIndex;

        try {
            if ($request->totalParts > $handle->chunk_maxi || $request->chunkSize > $handle->chunk_mxsz) {
                return response()->json([
                    'success' => false,
                    'message' => 'File or chunk size is too large.',
                    'preventRetry' => true,
                ], 500);
            }

            if (!$request->has('mediaName')) {
                return response()->json([
                    'success' => false,
                    'message' => 'Media must have a filename.',
                    'preventRetry' => true,
                ], 500);
            }

            $file = $request->file($handle->chunk_inpt);

            $file->storeAs($chunk_uuid, $chunk_indx, $handle->chunk_fldr);

            return response()->json([
                'success' => true,
                'uuid' => $chunk_uuid,
            ], 200);
        } catch (\Exception $e) {
            $handle->cleanChunks($chunk_uuid);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage(),
                'preventRetry' => true,
            ], 500);
        }
    }

    /**
     * Undocumented function
     *
     * @param [type] $uuid
     * @return void
     */
    public function cleanChunks($uuid)
    {
        try {
            $path = storage_path('chunks' . DIRECTORY_SEPARATOR . $uuid);

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
     * Undocumented function
     *
     * @param Request $request
     * @return void
     */
    public static function combineChunk(Request $request)
    {
        $handle = new static();

        $chunk_uuid = $request->uuid;
        $chunk_ttal = (int) $request->totalParts;
        $chunk_file = explode('.', $request->fileName);
        $chunk_extn = strtolower(array_pop($chunk_file));

        $chunk_name = sha1($request->mediaName);

        if ($request->mediaName !== 'apps-logo' || $request->mediaName !== 'apps-backdrop') {
            $chunk_name = sha1($request->user()->id . $request->mediaName);
        }

        $chunk_trgt = storage_path($handle->chunk_fldr . DIRECTORY_SEPARATOR . $chunk_uuid);
        $store_path = $handle->chunk_trgt . DIRECTORY_SEPARATOR . $chunk_name . '.' . $chunk_extn;
        $media_path = storage_path($store_path);

        try {
            if (File::exists($media_path)) {
                unlink($media_path);
            }

            $media_trgt = fopen($media_path, 'wb');

            for ($i = 0; $i < $chunk_ttal; ++$i) {
                $chunk = fopen($chunk_trgt . DIRECTORY_SEPARATOR . $i, 'rb');
                stream_copy_to_stream($chunk, $media_trgt);
                fclose($chunk);
            }

            fclose($media_trgt);
            $handle->cleanChunks($chunk_uuid);

            $name = $chunk_name;
            $byte = File::size(storage_path($store_path));
            $extn = File::extension(storage_path($store_path));
            $type = File::type(storage_path($store_path));
            $mime = File::mimeType(storage_path($store_path));
            $path = $name . '.' . $extn;

            return response()->json([
                'success' => true,
                'uuid' => $chunk_uuid,
                'record' => [
                    'name' => $name,
                    'byte' => $byte,
                    'extn' => $extn,
                    'type' => $type,
                    'mime' => $mime,
                    'path' => url('media' . DIRECTORY_SEPARATOR . 'original' . DIRECTORY_SEPARATOR . $path),
                ]
            ], 200);
        } catch (\Exception $e) {
            $handle->cleanChunks($chunk_uuid);

            return response()->json([
                'success' => false,
                'message' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Undocumented function
     *
     * @param [type] $filename
     * @return void
     */
    public static function destroyMedia($filename)
    {
        $handle = new static();

        if (File::delete(storage_path($handle->uploadFolder . DIRECTORY_SEPARATOR . $filename))) {
            return response()->json([
                'success' => true,
            ], 200);
        }

        return response()->json([
            'success' => true,
        ], 200);
    }
}
