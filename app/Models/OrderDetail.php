<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderDetail extends Model
{
    protected $fillable = ['product_id', 'product_name','product_price','quantity'];

    public function product()
    {
        return $this->hasOne(Product::class, 'id', 'product_id');
    }
}
