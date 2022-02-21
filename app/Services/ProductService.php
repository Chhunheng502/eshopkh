<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function create($request)
    {
        $product = Product::create($request->validated());

        $primary_image_path = $request->file('primary_image')->store('images', ['disk' => 'public']);
        $secondary_image1_path = $request->file('secondary_image1')?->store('images', ['disk' => 'public']);
        $secondary_image2_path = $request->file('secondary_image2')?->store('images', ['disk' => 'public']);

        $product->detail()->create([
            'primary_image' => 'http://127.0.0.1:8000/storage/' . $primary_image_path,
            'secondary_image1' => 'http://127.0.0.1:8000/storage/' . $secondary_image1_path,
            'secondary_image2' => 'http://127.0.0.1:8000/storage/' . $secondary_image2_path,
            'info' => $request->info,
            'highlight' => $request->highlight
        ]);

        return true;
    }

    public function uploadImage($image)
    {
        $path = Storage::put('eshopkh', $image, 'public');

        return Storage::url($path);
    }

    public function update($request, $id)
    {
        $product = Product::find($id);

        $product->fill($request->input())->detail->fill(request(['info', 'highlight']));

        if(!is_string($request->primary_image)) {
            $primary_image_path = $request->file('primary_image')->store('images', ['disk' => 'public']);
            $product->detail->primary_image = 'http://127.0.0.1:8000/storage/' . $primary_image_path;
        }
        if(!is_string($request->secondary_image2)) {
            $secondary_image1_path = $request->file('secondary_image1')?->store('images', ['disk' => 'public']);
            $product->detail->secondary_image1 = 'http://127.0.0.1:8000/storage/' . $secondary_image1_path;
        }
        if(!is_string($request->secondary_image2)) {
            $secondary_image2_path = $request->file('secondary_image2')?->store('images', ['disk' => 'public']);
            $product->detail->secondary_image2 = 'http://127.0.0.1:8000/storage/' . $secondary_image2_path;
        }

        $product->save();
        $product->detail->save();

        return true;
    }
}