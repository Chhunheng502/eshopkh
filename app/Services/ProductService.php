<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function uploadImage($image)
    {
        $path = Storage::put('eshopkh', $image, 'public');

        return Storage::url($path);
    }
}