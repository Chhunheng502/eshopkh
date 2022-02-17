<?php

namespace App\Services;

use App\Models\Collection;
use Illuminate\Support\Facades\Storage;

class CollectionService
{
    public function uploadImage($image)
    {
        $path = Storage::put('eshopkh', $image, 'public');

        return Storage::url($path);
    }

    public function addProduct($collection_id, $product_id)
    {
        Collection::find($collection_id)->detail()->create([
            'product_id' => $product_id
        ]);
    }
}