<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mesin extends Model
{
    protected $fillable = [
        'kode_mesin',
        'nama_mesin',
        'lokasi',
        'kategori'
    ];
}
