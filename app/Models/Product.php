<?php

namespace App\Models;

use App\Filters\ProductFilters;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = ['name','price','feature','quantity','type'];

    protected $hidden = ['created_at', 'updated_at'];

    public function detail()
    {
        return $this->hasOne(ProductDetail::class);
    }

    public function scopeFilter($query, $filters)
    {
        return $filters->apply($query);
    }

    public function scopeWithDetail($query)
    {
        return $query->with(['detail' => function($query) {
                    $query->selectNecessary();
                }])
                ->filter(new ProductFilters)
                ->paginate(15)
                ->withQueryString();
    }

    public function scopeType($query, $type)
    {
        return $query->where('type', $type);
    }

    public function scopeCollection($query, $id)
    {
        return $query->whereIn('id', collect(
                        CollectionDetail::where('collection_id', $id)
                        ->get('product_id')->toArray()
                    )->flatten()
                );
    }
}
