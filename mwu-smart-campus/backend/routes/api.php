<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BuildingController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CampusController;
use App\Http\Controllers\RouteController;

Route::get('/categories', [CategoryController::class, 'index']);
Route::get('/buildings', [BuildingController::class, 'index']);
Route::get('/buildings/{id}', [BuildingController::class, 'show']);
Route::get('/campus-boundary', [CampusController::class, 'index']);
Route::get('/route', [RouteController::class, 'route']);
