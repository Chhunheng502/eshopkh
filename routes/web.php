<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ImportExportController;

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

Route::get('/import-export', function () {
    return view('importexport');
});

/*Excel import export*/
Route::get('/export', [ImportExportController::class, 'export'])->name('export');
Route::get('/importExportView', [ImportExportController::class, 'importExportView']);
Route::post('/import', [ImportExportController::class, 'import'])->name('import');
