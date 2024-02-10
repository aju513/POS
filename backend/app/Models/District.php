<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class District extends Model
{
    use HasFactory;

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }
    public function municipalities(): HasMany
    {
        return $this->hasMany(Municipality::class, 'district_id');
    }
    public function getDistrictByProvinceId($id)
    {
        return self::query()->where('province_id', '=', $id)->select('id', 'name')->get();
    }
}
