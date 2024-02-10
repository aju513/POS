<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Brand extends Model
{
    use HasFactory;

    const IMG_URL_PATH = 'images/uploads/brand/';
    const THUMB_IMG_URL_PATH = 'images/uploads/brand_thumb/';
    protected $fillable = ['name', 'slug', 'serial', 'status', 'description', 'photo', 'user_id'];

    public function storeBrand(array $input)
    {
        return self::query()->create($input);
    }

    public function getAllBrand($input)
    {
        $query = self::query();

        if ($input['order_by']) {
            $query->orderBy('id', $input['order_by']);
        }
        if ($input['search']) {
            $query->where('name', 'like', '%' . $input['search'] . '%');
        }
        return $query->with('user:id,name')->paginate($input['pages'] ?? 10);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
