<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $table = 'collections';

    protected $fillable = ['name','image'];

    public function getProducts()
    {
        return $this->hasMany('App\Models\CollectionDetail');
    }
}