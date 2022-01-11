<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    protected $fillable = ['user_id','total_cost','payment','is_accepted'];

    public function getDetail()
    {
        return $this->hasMany('App\Models\OrderDetail');
    }
}
