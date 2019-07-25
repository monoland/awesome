<?php

Route::middleware('throttle:200,1')->group(function () {
    Route::get('company', 'Mono\WebController@company');
});

Route::middleware('auth:api')->group(function () {
    // monoland
    Route::get('/user', 'Mono\WebController@user');
    Route::get('/menus', 'Mono\WebController@menus');
    Route::put('/profile', 'Mono\WebController@profile');
    Route::put('/password', 'Mono\WebController@password');

    Route::get('authent/combo', 'Mono\AuthentController@combo');
    Route::post('users/bulkdelete', 'Mono\UserController@bulkdelete');
    Route::resource('users', 'Mono\UserController');
    Route::resource('setting', 'Mono\SettingController');
    Route::resource('client', 'Mono\ClientController');

    Route::post('media', 'Mono\MediaController@store');
    Route::delete('media/{media}', 'Mono\MediaController@destroy');
    Route::get('media/{media}/download', 'Mono\MediaController@download');

    // application
});
