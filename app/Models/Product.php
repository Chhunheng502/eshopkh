<?php

namespace App\Models;

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

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['gender'] ?? false, fn($query, $gender) =>
            $gender=='all' ? '' : $query->where(fn($query) =>
                $query->where('type', 'like', '%' . $gender . '%')
            )
        );

        $query->when($filters['type'] ?? false, fn($query, $type) =>
            $type=='all' ? '' : $query->where(fn($query) =>
                $query->where('type', 'like', '%' . $type . '%')
            )
        );

        $query->when($filters['search'] ?? false, fn($query, $search) =>
            $query->where(fn($query) =>
                $query->where('name', 'like', '%' . $search . '%')
            )
        );

        $query->when($filters['sort'] ?? false, fn($query, $sort) =>
            $query->orderBy(
                str_replace(['_asc', '_desc'], '', $sort),
                str_replace(['name_', 'price_', 'quantity_'], '', $sort)
            )
        );
    }

    public function scopeWithDetail($query)
    {
        return $query->with(['detail' => function($query) {
                    $query->selectNecessary();
                }])
                ->filter(request(['search', 'sort']))
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

    public function getAll()
    {
        return $this->withDetail();
    }

    public function getAllForAdmin()
    {
        return $this->with('detail')
                ->filter(request([
                    'gender',
                    'type',
                    'search',
                    'sort',
                ]))
                ->paginate(15)
                ->withQueryString();
    }

    public function getByType($type)
    {
        return $this->type($type)
                    ->withDetail();
    }

    public function getDetail($id)
    {
        return Product::find($id)
                ->with('detail')
                ->get()[0];
    }

    public function getByCollection($id) {
        return $this->collection($id)
                    ->withDetail();
    }
}
