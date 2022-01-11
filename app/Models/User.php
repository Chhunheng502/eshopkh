<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $table = 'users';

    protected $fillable = ['first_name','last_name','email','password','gender','age','phone','address'];

    public function getPromo()
    {
        return $this->hasMany('App\Models\UserPromo');
    }

    public function getWishlist()
    {
        return $this->hasMany('App\Models\UserWishlist');
    }
}
