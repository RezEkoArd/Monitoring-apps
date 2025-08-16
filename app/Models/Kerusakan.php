<?php

namespace App\Models;

use App\Enums\StatusKerusakan;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Kerusakan extends Model
{
    protected $fillable = [
        'mesin_id',
        'user_id',
        'deskripsi',
        'status',
        'waktu-lapor'
    ];

    protected $casts = [
        'status' => StatusKerusakan::class
    ];

    public function mesin(): BelongsTo
    {
        return $this->belongsTo(Mesin::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

}
