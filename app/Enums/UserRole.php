<?php

namespace App\Enums;

enum UserRole: string
{
    case User = 'user';
    case Teknisi = 'teknisi';
    case Operator = 'operator';
}
