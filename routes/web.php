<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});


Route::group(['middleware' => ['api']], function () {
    Route::post('/api/register', [
        'uses' => 'Auth\RegisterController@register',
    ]);

    Route::post('/api/signin', [
        'uses' => 'Auth\LoginController@signin',
    ]);

    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('/user', [
            'uses' => 'UserController@index',
        ]);
    });
	
	
	    Route::group(['middleware' => 'jwt.auth'], function () {
        Route::get('/user/info', [
            'uses' => 'UserController@index2',
        ]);
    });

});