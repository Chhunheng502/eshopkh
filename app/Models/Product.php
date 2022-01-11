<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = ['name','price','feature','quantity','type'];

    public function getDetail()
    {
        return $this->hasOne('App\Models\ProductDetail');
    }
}
