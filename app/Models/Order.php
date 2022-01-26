<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = ['user_id','total_cost','payment','is_accepted'];

    public function user() {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function detail()
    {
        return $this->hasMany(OrderDetail::class);
    }

    public function getCreatedAtAttribute($created_at)
    {
        return Carbon::createFromTimeStamp(strtotime($created_at) )->diffForHumans();
    }
}
