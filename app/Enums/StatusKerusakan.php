<?php

namespace App\Enums;

enum StatusKerusakan: string
{
    case Dilaporkan = 'Dilaporkan';
    case DalamPerbaikan = 'Dalam Perbaikan';
    case Selesai = 'Selesai';
    case DiTolak = 'DiTolak';
}
