<?php

namespace App\Http\Controllers;

use App\Enums\StatusKerusakan;
use App\Models\Kerusakan;
use App\Models\Mesin;
use App\Models\Perbaikan;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class KerusakanController extends Controller
{
    //? Management Kerusakan Admin
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

    public function indexOperator(Request $request){
        $searchQuery = $request->query('search');

       
        $kerusakans = Kerusakan::with(['mesin', 'user'])
        // ->where('user_id', Auth::id())
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

        $nextId = (Kerusakan::max('id') ?? 0) + 1;
        
        Kerusakan::create([
            'mesin_id' => $validated['mesin_id'],
            'user_id' => Auth::id(),
            'kode_kerusakan' => 'KRS-' . str_pad($nextId, 3, '0', STR_PAD_LEFT),
            'deskripsi' => $validated['deskripsi'],
            'status' => StatusKerusakan::Dilaporkan->value,
            'waktu_lapor' => now()
        ]);

        return redirect()->route('kerusakans.index')->with('success', 'Lapor kerusakan berhasil ditambahkan');
    }

    public function assign($id) {

        $teknisi = User::where('role', 'teknisi')->get();

        $kerusakan = Kerusakan::findOrFail($id);

        return Inertia::render('kerusakan/assign', [
            'teknisi' => $teknisi,
            'kerusakan' => $kerusakan,
        ]);
    }

    public function update(Request $request, $id) {

        $validated = $request->validate([
            'status' => 'required|in:'. implode(',', array_map(fn($case) => $case->value, StatusKerusakan::cases())),
            'teknisi_id' => 'nullable|exists:users,id'

        ]);

        DB::beginTransaction();

        try{
          $kerusakan = Kerusakan::findOrFail($id);
          
          $kerusakan->update([
            'status' => $validated['status']
          ]);

            // Jika status = "Dalam Perbaikan", buat record di table Perbaikan
            if ($validated['status'] === 'Dalam Perbaikan' && $request->filled('teknisi_id')) {

                $existingPerbaikan = Perbaikan::where('kerusakan_id', $kerusakan->id)->first();

                if ($existingPerbaikan) {
                    // rollback dulu biar perubahan status gak kepake
                    DB::rollBack();
                    return redirect()
                        ->route('kerusakans.index')
                        ->with('errorMessage', 'Perbaikan untuk kerusakan ini sudah ada!');
                }
            
                Perbaikan::create([
                    'kerusakan_id' => $kerusakan->id,
                    'teknisi_id' => $validated['teknisi_id'],
                    'waktu_mulai' => now(),
                    'tindakan' => 'Perbaikan dimulai',
                    'sparepart' => 'Sparepart yang digunakan'
                ]);
            
            }

            DB::commit();
            return redirect()->route('kerusakans.index')->with('success', 'Kerusakan list sudah di Assign ke Teknisi');

        }catch (\Exception $e) {
            DB::rollBack();

            return redirect()->back()->withErrors([
            'error' => 'Gagal memperbarui kerusakan: ' . $e->getMessage()
        ]);

        }
    }

    public function destroy(string $id) {
        $kerusakan = Kerusakan::findOrFail($id); // Akan otomatis throw 404 jika tidak ditemukan
        
        $kerusakan->delete();

        return redirect()->back()->with('success', 'Laporan kerusakan berhasil dihapus');
    }

}
