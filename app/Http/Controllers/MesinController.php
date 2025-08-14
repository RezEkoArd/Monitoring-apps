<?php

namespace App\Http\Controllers;

use App\Models\Mesin;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MesinController extends Controller
{
    public function index(Request $request) {

        // Get value
        $searchQuery = $request->query('search');

        $mesins = Mesin::when($searchQuery, function($query, $search) {
            return $query -> where('nama_mesin', 'like', '%' . $search . '%')
                        -> orwhere('kode_mesin', 'like', '%' . $search . '%')
                        ->orwhere('lokasi', 'like', '%' . $search . '%')
                        ->orwhere('kategori', 'like', '%' . $search . '%');
        })
        ->latest()
        ->get();

        return Inertia::render('mesin/index', [
            'data' => $mesins,
            'filters' => $request->only(['search'])
        ]);
    }
}
