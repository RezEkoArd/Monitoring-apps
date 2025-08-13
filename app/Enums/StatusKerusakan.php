<?php

namespace App\Enums;

enum StatusKerusakan: string
{
    case Dilaporkan = 'dilaporkan';
    case Proses = 'proses';
    case Selesai = 'selesai';
}
