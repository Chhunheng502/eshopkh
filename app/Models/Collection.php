<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $table = 'collections';

    protected $fillable = ['name','image'];

    public function detail()
    {
        return $this->hasMany(CollectionDetail::class);
    }
}
