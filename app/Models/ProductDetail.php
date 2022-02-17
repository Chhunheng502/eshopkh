<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductDetail extends Model
{
    protected $fillable = ['primary_image','secondary_image1','secondary_image2','info','highlight'];

    protected $hidden = ['created_at', 'updated_at'];

    public function scopeSelectNecessary($query)
    {
        return $query->select('id', 'product_id', 'primary_image');
    }
}