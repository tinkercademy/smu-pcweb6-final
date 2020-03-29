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

Route::post('/logout', 'UserinfoController@destroy');

Route::post('/homepage', 'UserinfoController@show');

Route::get('/homepage', 'UserinfoController@redirect');

Route::post('/homepage/share', 'PostController@store');

Route::post('/register', 'UserinfoController@store');

Route::get('/register', function () {
    return view('register');
});

Route::get('/homepage/posts', 'PostController@index');

Route::post('/homepage/currentuser', 'UserinfoController@index');

Route::post('/homepage/posts', 'PostController@store');

Route::post('/homepage/delete', 'PostController@delete');

Route::post('/homepage/deleteReply', 'PostController@deletereply');

Route::post('/homepage/update', 'PostController@update');

Route::post('/homepage/updatePT', 'PostController@updatePT');

Route::post('/homepage/updateReply', 'PostController@updateReply');

Route::post('/homepage/reply', 'PostController@reply');

Route::post('/homepage/replyParent', 'PostController@replyParent');

Route::post('/tweet/tweetID', 'PostController@view');

Route::post('/tweet', 'PostController@display');

Route::get('/tweet/{ID}', 'PostController@specific');

Route::get('/tweet', 'PostController@loadparenttweet');

Route::post('/tweet/replies', 'PostController@loadreplies');

Route::post('/search', 'PostController@search');


