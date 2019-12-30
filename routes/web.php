<?php

use Illuminate\Support\Facades\Route;

Route::get('/', 'Apps\WebController@index');
Route::get('/info', 'Apps\WebController@webinfo');
