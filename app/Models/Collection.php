<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = ['name','image'];

    public function detail()
    {
        return $this->hasMany(CollectionDetail::class);
    }

    public function scopeWithDetail($query)
    {
        return $query->with(['detail' => function($query) {
                    $query->with(['product' => function($query) {
                        $query->with('detail');
                    }]);
                }]);
    }

    public function getFirst()
    {
        return $this->withDetail()
                    ->first()
                    ->detail;
    }

    public function getAll()
    {
        return $this->withDetail()
                    ->paginate(15);
    }

    public function getCollection($id)
    {
        return CollectionDetail::withDetail()
                                ->where('collection_id', $id)
                                ->paginate(15);
    }
}
