<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Category extends Model
{
    use HasFactory;

    const IMG_URL_PATH = 'images/uploads/category/';
    const THUMB_IMG_URL_PATH = 'images/uploads/category_thumb/';
    protected $fillable = ['name', 'slug', 'serial', 'status', 'description', 'photo', 'user_id'];
    public function storeCategory(array $input)
    {
        return self::query()->create($input);
    }
    public function getAllCategory($input)
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
    public function getCategoryIdAndName()
    {
        return self::query()->select('name', 'id')->get();
    }
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
