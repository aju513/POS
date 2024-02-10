<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Province extends Model
{
    use HasFactory;

    public function districts(): HasMany
    {
        return $this->hasMany(District::class);
    }

    public function municipalities(): HasMany
    {
        return $this->hasMany(Municipality::class, 'province_id');
    }


    public function getProvince()
    {
        return self::query()->select('name', 'id')->get();
    }
}
