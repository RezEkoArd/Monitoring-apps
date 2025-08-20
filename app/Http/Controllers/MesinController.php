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
        ->get();

        return Inertia::render('mesin/index', [
            'data' => $mesins,
            'filters' => $request->only(['search'])
        ]);
    }

    public function store(Request $request) 
    {
        $validated = $request->validate([
            'nama_mesin' => 'required|string|max:50',
            'lokasi' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
        ]);
    
        $nextId = (Mesin::max('id') ?? 0) + 1;
    
        Mesin::create([
            'kode_mesin' => 'FDP-' . str_pad($nextId, 3, '0', STR_PAD_LEFT), // Akan jadi FDP-001, FDP-002, dst
            'nama_mesin' => $validated['nama_mesin'],
            'lokasi' => $validated['lokasi'],
            'kategori' => $validated['kategori'],
        ]);
    
        return redirect()->back()->with('success', 'Mesin berhasil ditambahkan');
    }

    public function update(Request $request, $id) {

        $validated = $request->validate([
            'nama_mesin' => 'required|string|max:50',
            'lokasi' => 'required|string|max:255',
            'kategori' => 'required|string|max:255',
        ]);
    
        $mesin = Mesin::findOrFail($id);
    
        $mesin->update([
            'nama_mesin' => $validated['nama_mesin'],
            'lokasi' => $validated['lokasi'],
            'kategori' => $validated['kategori'],
        ]);
    
        return redirect()->back()->with('success', 'Mesin berhasil diperbarui');
    }

    public function destroy(string $id) {
        $mesin = Mesin::findOrFail($id); // Akan otomatis throw 404 jika tidak ditemukan
    
        $mesin->delete();
        
        return redirect()->back()->with('success', 'Mesin berhasil dihapus');
    
    }
}
