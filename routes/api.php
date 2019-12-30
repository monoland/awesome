<?php

use Illuminate\Support\Facades\Route;

Route::middleware(['auth:api', 'throttle:6000,1'])->group(function () {
    Route::post('media', 'Mono\MediaController@store')->name('media.store');
});

Route::middleware(['auth:api', 'api'])->group(function () {
    Route::get('menu', 'Apps\WebController@menu');
    Route::get('user', 'Apps\WebController@user');

    Route::get('password', 'Mono\PasswordController@index')->name('password.index');
    Route::match(['PUT', 'PATCH'], 'password', 'Mono\PasswordController@update')->name('password.update');

    Route::get('profile', 'Mono\ProfileController@index')->name('profile.index');
    Route::match(['PUT', 'PATCH'], 'profile', 'Mono\ProfileController@update')->name('profile.update');

    Route::resource('setting', 'Mono\SettingController')->only(['index', 'store', 'update', 'destroy']);
    Route::resource('account', 'Mono\AccountController')->parameters([
        'account' => 'user'
    ])->only(['index', 'store', 'update', 'destroy']);
});
