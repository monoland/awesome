<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\NotificationCollection;
use App\Http\Resources\NotificationResource;
use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', Notification::class);

        return new NotificationCollection(
            $request->user()->notifications()->paginate($request->itemsPerPage)
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
        $this->authorize('create', Notification::class);

        $this->validate($request, []);

        return Notification::storeRecord($request);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function show(Notification $notification)
    {
        $this->authorize('view', $notification);

        return new NotificationResource($notification);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Notification $notification)
    {
        $this->authorize('update', $notification);

        $this->validate($request, []);

        return Notification::updateRecord($request, $notification);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Notification $notification
     * @return \Illuminate\Http\Response
     */
    public function destroy(Notification $notification)
    {
        $this->authorize('delete', $notification);

        return Notification::destroyRecord($notification);
    }

    /**
     * Restore the specified resource from deleted
     *
     * @param \App\Models\Notification  $notification
     * @return \Illuminate\Http\Response
     */
    public function restore(Notification $notification)
    {
        $this->authorize('restore', Notification::class);

        return Notification::restoreRecord($notification);
    }

    /**
     * Force Delete the specified resource
     *
     * @param \App\Models\Notification $notification
     * @return \Illuminate\Http\Response
     */
    public function forceDelete(Notification $notification)
    {
        $this->authorize('forceDelete', Notification::class);

        return Notification::forceDeleteRecord($notification);
    }
}
