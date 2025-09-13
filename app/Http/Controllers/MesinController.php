<?php

namespace App\Http\Controllers;

use App\Models\Mesin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'gambar_mesin' => 'nullable|image|max:2048', // Maksimal 2MB
        ]);
    
        $nextId = (Mesin::max('id') ?? 0) + 1;

        $gambarPath = null;

        if ($request->hasFile('gambar_mesin')) {
            $gambarPath = $request->file('gambar_mesin')->store('mesin_images', 'public');
        }   
    
        Mesin::create([
            'kode_mesin' => 'FDP-' . str_pad($nextId, 3, '0', STR_PAD_LEFT), // Akan jadi FDP-001, FDP-002, dst
            'nama_mesin' => $validated['nama_mesin'],
            'lokasi' => $validated['lokasi'],
            'kategori' => $validated['kategori'],
            'gambar_mesin' => $request->file('gambar_mesin') ? $gambarPath : null,
        ]);
    
        return redirect()->back()->with('success', 'Mesin berhasil ditambahkan');
    }

    public function update(Request $request, $id) {
        $validated = $request->validate([
            'nama_mesin' => 'sometimes|string|max:50',
            'lokasi' => 'sometimes|string|max:255',
            'kategori' => 'sometimes|string|max:255',
            'gambar_mesin' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);
    
        $mesin = Mesin::findOrFail($id);

        $updateData = [
            'nama_mesin' => $validated['nama_mesin'] ?? $mesin->nama_mesin,
            'lokasi'     => $validated['lokasi']     ?? $mesin->lokasi,
            'kategori'   => $validated['kategori']   ?? $mesin->kategori,
        ];

        if ($request->hasFile('gambar_mesin')) {
            // hapus lama kalau ada
            if ($mesin->gambar_mesin && Storage::disk('public')->exists($mesin->gambar_mesin)) {
                Storage::disk('public')->delete($mesin->gambar_mesin);
            }
    
            // upload baru
            $gambarPath = $request->file('gambar_mesin')->store('mesin_images', 'public');
            $updateData['gambar_mesin'] = $gambarPath;
        }

        $mesin->update($updateData);
    
        return redirect()->back()->with('success', 'Mesin berhasil diperbarui');
    }

    public function destroy(string $id) {
        $mesin = Mesin::findOrFail($id); // Akan otomatis throw 404 jika tidak ditemukan
    
        $mesin->delete();
        
        return redirect()->back()->with('success', 'Mesin berhasil dihapus');
    
    }
}
