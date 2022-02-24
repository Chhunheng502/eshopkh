<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;

class CollectionService
{
    public function uploadImage($image)
    {
        $path = Storage::put('eshopkh', $image, 'public');

        return Storage::url($path);
    }
}