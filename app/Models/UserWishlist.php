<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserWishlist extends Model
{
    protected $table = 'user_wishlist';

    protected $fillable = ['product_id'];
}
