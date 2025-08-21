<?php

namespace App\Http\Controllers;

use App\Models\Perbaikan;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerbaikanController extends Controller
{
    //
    public function index(Request $request) 
    {
        $searchQuery = $request->query('search');

        $perbaikans = Perbaikan::with(['kerusakan', 'teknisi'])
        ->when($searchQuery, fn($q) =>
            $q->whereAny(['tindakan', 'sparepart', 'catatan'], 'like', "%{$searchQuery}%")
            ->orWhereHas('kerusakan', fn($mq) =>
                $mq->whereAny(['deskripsi', 'status'], 'like', "%{$searchQuery}%")
            )
            ->orWhereHas('teknisi', fn($uq) =>
                $uq->where('name', 'like', "%{$searchQuery}%")
            )
        )
        ->get();

        return Inertia::render('perbaikan/index', [
            'perbaikan' => $perbaikans, 
            'filters' => $request->only(['search']),
        ]);
    }
}
