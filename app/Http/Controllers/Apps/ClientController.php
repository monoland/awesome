<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\ClientCollection;
use App\Http\Resources\ClientResource;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Client::class);

        return new ClientCollection(
            Client::filterOn($request)->paginate($request->itemsPerPage)
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
        $this->authorize('create', Client::class);

        $this->validate($request, []);

        return Client::storeRecord($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function show(Client $client)
    {
        $this->authorize('view', $client);

        return new ClientResource($client);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Client $client)
    {
        $this->authorize('update', $client);

        $this->validate($request, []);

        return Client::updateRecord($request, $client);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Client $client
     * @return \Illuminate\Http\Response
     */
    public function destroy(Client $client)
    {
        $this->authorize('delete', $client);

        return Client::destroyRecord($client);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\Client  $client
     * @return \Illuminate\Http\Response
     */
    public function restore(Client $client)
    {
        $this->authorize('restore', Client::class);

        return Client::restoreRecord($client);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\Client $client
     * @return \Illuminate\Http\Response
     */
    public function forceDelete(Client $client)
    {
        $this->authorize('forceDelete', Client::class);

        return Client::forceDeleteRecord($client);
    }
}
