<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\DocumentCollection;
use App\Http\Resources\DocumentResource;
use App\Models\Document;
use Illuminate\Http\Request;

class DocumentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Document::class);

        return new DocumentCollection(
            Document::filterOn($request)->paginate($request->itemsPerPage)
        );
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $this->authorize('create', Document::class);

        $this->validate($request, []);

        return Document::storeRecord($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Document $document)
    {
        $this->authorize('view', $document);

        return response()->file(
            storage_path($document->drve . DIRECTORY_SEPARATOR . sha1($request->user()->id) . DIRECTORY_SEPARATOR . $document->slug),
            [
                'Content-Type' => $document->mime,
                'Content-Disposition' => 'inline; filename="' . $document->name . '"'
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Document $document)
    {
        $this->authorize('update', $document);

        $this->validate($request, []);

        return Document::updateRecord($request, $document);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Document $document
     * @return \Illuminate\Http\Response
     */
    public function destroy(Document $document)
    {
        $this->authorize('delete', $document);

        return Document::destroyRecord($document);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\Document  $document
     * @return \Illuminate\Http\Response
     */
    public function restore(Document $document)
    {
        $this->authorize('restore', Document::class);

        return Document::restoreRecord($document);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\Document $document
     * @return \Illuminate\Http\Response
     */
    public function forceDelete(Document $document)
    {
        $this->authorize('forceDelete', Document::class);

        return Document::forceDeleteRecord($document);
    }
}
