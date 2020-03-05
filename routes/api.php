<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'throttle:6000,1'])->group(function () {
    Route::post('document', 'Apps\DocumentController@store')->name('document.store');
});

Route::middleware(['auth:api', 'api'])->group(function () {
    Route::get('menus', 'Apps\WebController@menus');
    Route::get('user', 'Apps\WebController@user');

    Route::get('dashboard', 'Apps\DashboardController@index');

    Route::post('module/{module}/movedown', 'Apps\ModuleController@movedown')->name('module.movedown');
    Route::post('module/{module}/moveup', 'Apps\ModuleController@moveup')->name('module.moveup');
    Route::post('module/{module}/restore', 'Apps\ModuleController@restore')->name('module.restore');
    Route::delete('module/{module}/delete', 'Apps\ModuleController@forceDelete')->name('module.delete');
    Route::resource('module', 'Apps\ModuleController')->only(['index', 'store', 'update', 'destroy']);

    Route::post('module/{module}/permission/{permission}/restore', 'Apps\PermissionController@restore')->name('module.permission.restore');
    Route::delete('module/{module}/permission/{permission}/delete', 'Apps\PermissionController@forceDelete')->name('module.permission.delete');
    Route::resource('module.permission', 'Apps\PermissionController')->only(['index', 'store', 'update', 'destroy']);

    Route::post('role/{role}/restore', 'Apps\RoleController@restore')->name('role.restore');
    Route::delete('role/{role}/delete', 'Apps\RoleController@forceDelete')->name('role.delete');
    Route::resource('role', 'Apps\RoleController')->only(['index', 'store', 'update', 'destroy']);

    Route::post('account/{user}/restore', 'Apps\AccountController@restore')->name('account.restore');
    Route::delete('account/{user}/delete', 'Apps\AccountController@forceDelete')->name('account.delete');
    Route::resource('account', 'Apps\AccountController')->parameters([
        'account' => 'user'
    ])->only(['index', 'store', 'update', 'destroy']);

    Route::post('client/{client}/restore', 'Apps\ClientController@restore')->name('client.restore');
    Route::delete('client/{client}/delete', 'Apps\ClientController@forceDelete')->name('client.delete');
    Route::resource('client', 'Apps\ClientController')->only(['index', 'store', 'update', 'destroy']);

    Route::resource('setting', 'Apps\SettingController')->only(['index', 'store', 'update', 'destroy']);
    Route::resource('profile', 'Apps\ProfileController')->only(['index', 'store']);
    Route::resource('password', 'Apps\PasswordController')->only(['index', 'store']);
    Route::resource('notification', 'Apps\NotificationController')->only(['index', 'update']);

    Route::resource('document', 'Apps\DocumentController')->only(['index', 'show', 'update', 'destroy']);
});
