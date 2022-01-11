<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserPromo extends Model
{
    protected $table = 'user_promo';

    protected $fillable = ['product_id','coupon_type','promo_code'];
}
