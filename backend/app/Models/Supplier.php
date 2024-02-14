<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Supplier extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'phone', 'email', 'status', 'description', 'logo', 'user_id'];
    const IMG_URL_PATH = 'images/uploads/supplier/';
    const THUMB_IMG_URL_PATH = 'images/uploads/supplier_thumb/';
    public function storeSupplier(array $input)
    {
        return self::query()->create($input);
    }
    public function address()
    {
        return $this->morphOne(Address::class, 'addressable');
    }

    public function getAllSupplier($input)
    {
        $query = self::query()->with('address', 'address.province', 'address.district', 'address.municipality');

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
