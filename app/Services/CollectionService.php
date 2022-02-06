<?php

namespace App\Services;

use App\Models\Collection;

class CollectionService
{

    public function addProduct($collection_id, $product_id)
    {
        Collection::find($collection_id)->detail()->create([
            'product_id' => $product_id
        ]);
    }

}