<?php

use App\Http\Controllers\KerusakanController;
use App\Http\Controllers\MesinController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    // Management Mesin
    Route::get('/mesin', [MesinController::class, 'index'])->name('mesin.index');
    Route::post('/mesin', [MesinController::class, 'store'])->name('mesin.store');
    Route::put('/mesin/{id}', [MesinController::class, 'update'])->name('mesin.update');
    Route::delete('/mesin/{id}', [MesinController::class, 'destroy'])->name('mesin.destroy');

    // Management Kerusakan 
    // Route::get('/kerusakan-admin', [KerusakanController::class, 'index'])->name('kerusakan.admin.index');
    Route::get('/kerusakans', [KerusakanController::class, 'indexOperator'])->name('kerusakans.index');
    Route::post('/kerusakans', [KerusakanController::class, 'store'])->name('kerusakan.store'); 
    Route::delete('/kerusakans/{id}', [KerusakanController::class, 'destroy'])->name('kerusakan.destroy');

    Route::get('/kerusakans/{id}/assign', [KerusakanController::class, 'assign'])->name('kerusakan.assign');
    Route::patch('/kerusakans/{id}/assign', [KerusakanController::class, 'update'])->name('perbaikan.assign');
});
 
// Role admin
 Route::middleware(['auth', 'verified', 'admin'])->group(function () {
    // Management Users - hanya admin yang bisa mengubah role
    Route::get('/users', [UserController::class, 'index'])->name('users.index');    
    Route::put('/users/{id}/role', [UserController::class, 'updateRole'])->name('users.updateRole');
});


// Role Opertor
// Route::middleware((['auth', 'verified', 'operator']))->group(function () {
//     Route::post('/kerusakans', [KerusakanController::class, 'store'])->name('kerusakan.store'); 
// });


require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
