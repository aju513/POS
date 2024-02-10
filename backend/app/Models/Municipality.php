<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Municipality extends Model
{
    use HasFactory;
    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_id');
    }
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class, 'district_id');
    }
    public function getMunicipalityByDistrictId($id)
    {
        return self::query()->where('district_id', '=', $id)->select('id', 'name')->get();
    }
}
