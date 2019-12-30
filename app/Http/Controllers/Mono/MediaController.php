<?php

namespace App\Http\Controllers\Mono;

use App\Models\Media;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class MediaController extends Controller
{
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        if (!$request->has('completed')) {
            return Media::chunkMedia($request);
        }

        return Media::combineChunk($request);
    }
}
