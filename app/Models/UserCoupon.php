<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserCoupon extends Model
{
    protected $fillable = ['product_id', 'type','code', 'expired_date'];

    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }

    public function scopeIsValid($query)
    {
        // return $query->whereRaw('expired_date > created_at');

        return $query->where('expired_date', '>', Carbon::now()->toDateString());
    }

    public function getExpiredDateAttribute($expired_date)
    {
        return Carbon::createFromDate($expired_date)->diffInDays();
    }

    public function getRouteKeyName()
    {
        return 'code';
    }
}
