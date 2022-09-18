<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CityController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DistrictController;
use App\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::namespace('Api')->group( function(){
    Route::post('/cities/store', [CityController::class, 'store']);
    Route::get('/cities/listIndex', [CityController::class, 'index']);
    Route::post('/user/store', [UserController::class, 'store']);
    Route::get('/user/listIndex', [UserController::class, 'index']);
    Route::post('/district/store', [DistrictController::class, 'store']);
    Route::get('/district/listndex', [DistrictController::class, 'index']);
    Route::get('/report/listndex', [ReportController::class, 'index']);
});