<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\MorphTo;

class Address extends Model
{
    use HasFactory;
    protected $fillable = ['province_id', 'district_id', 'municipality_id', 'type', 'addressable_type', 'addressable_id', 'user_id'];
    const SUPPLIER_ADDRESS = 1;

    const CUSTOMER_PERMANENT_ADDRESS = 2;
    const CUSTOMER_PRESENT_ADDRESS = 3;

    public function prepareData($input)
    {
        $input['type'] = self::SUPPLIER_ADDRESS;
        $input['status'] = 1;
        $carbonTimestamp = Carbon::parse($input['created_at']);

        // Format the Carbon instance to the Laravel-supported timestamp format
        $laravelTimestamp = $carbonTimestamp->format('Y-m-d H:i:s');
        $input['created_at'] = $laravelTimestamp;
        $input['updated_at'] = $laravelTimestamp;
        return $input;
    }
    public function addressable(): MorphTo
    {
        return $this->morphTo();
    }


    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class, 'province_id');
    }
    public function district(): BelongsTo
    {
        return $this->belongsTo(District::class, 'district_id');
    }
    public function municipality(): BelongsTo
    {
        return $this->belongsTo(Municipality::class, 'municipality_id');
    }

}
