<?php

namespace App\Services;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class ProductService
{
    public function create($request)
    {
        $product = Product::create($request->validated());

        $primary_image_path = $this->productService->uploadImage($request->safe()['primary_image']);
        $secondary_image1_path = $this->productService->uploadImage($request->safe()['secondary_image1']);
        $secondary_image2_path = $this->productService->uploadImage($request->safe()['secondary_image2']);

        $product->detail()->create([
            'primary_image' => $primary_image_path,
            'secondary_image1' => $secondary_image1_path,
            'secondary_image2' => $secondary_image2_path,
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
            $primary_image_path = $this->uploadImage($request->primary_image);
            $product->detail->primary_image = $primary_image_path;
        }
        if(!is_string($request->secondary_image2)) {
            $secondary_image1_path = $this->uploadImage($request->secondary_image1);
            $product->detail->secondary_image1 = $secondary_image1_path;
        }
        if(!is_string($request->secondary_image2)) {
            $secondary_image2_path = $this->uploadImage($request->secondary_image2);
            $product->detail->secondary_image2 = $secondary_image2_path;
        }

        $product->save();
        $product->detail->save();

        return true;
    }
}