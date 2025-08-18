<?php

namespace App\Http\Controllers;

use App\Enums\StatusKerusakan;
use App\Models\Kerusakan;
use App\Models\Mesin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class KerusakanController extends Controller
{
    public function index(Request $request){

        $searchQuery = $request->query('search');

       
        $kerusakans = Kerusakan::with(['mesin', 'user'])
        ->when($searchQuery, fn($q) =>
            $q->whereAny(['deskripsi', 'status'], 'like', "%{$searchQuery}%")
            ->orWhereHas('mesin', fn($mq) =>
                $mq->whereAny(['kode_mesin', 'nama_mesin'], 'like', "%{$searchQuery}%")
            )
            ->orWhereHas('user', fn($uq) =>
                $uq->where('name', 'like', "%{$searchQuery}%")
            )
        )
        ->get();

        $mesins = Mesin::all();

        return Inertia::render('kerusakan/index', [
            'data' => $kerusakans,
            'mesin' => $mesins,
            'filters' => $request->only(['search'])
        ]); 
    }

    public function store(Request $request) {   
        $validated = $request->validate([
            'mesin_id' => 'required|exists:mesins,id',
            'deskripsi' => 'required|string|max:255',
        ]);
        
        Kerusakan::create([
            'mesin_id' => $validated['mesin_id'],
            'user_id' => Auth::id(),
            'deskripsi' => $validated['deskripsi'],
            'status' => StatusKerusakan::Dilaporkan->value,
            'waktu_lapor' => now()
        ]);

        return redirect()->route('kerusakan.index')->with('success', 'Lapor kerusakan berhasil ditambahkan');
    }

}
