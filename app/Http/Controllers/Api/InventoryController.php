<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class InventoryController extends Controller
{
    public function store(Request $request)
    {

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'feature' => $request->feature,
            'quantity' => $request->quantity,
            'type' => $request->type
        ]);

        $primary_image_path = Storage::put('eshopkh', $request->primary_image, 'public');
        $secondary_image1_path = Storage::put('eshopkh', $request->secondary_image1, 'public');
        $secondary_image2_path = Storage::put('eshopkh', $request->secondary_image2, 'public');

        $product->detail()->create([
            'primary_image' => Storage::url($primary_image_path),
            'secondary_image1' => Storage::url($secondary_image1_path),
            'secondary_image2' => Storage::url($secondary_image2_path),
            'info' => $request->info,
            'highlight' => $request->highlight
        ]);

        return redirect('admin/inventory');
    }

    public function update(Request $request, $id)
    {
        $product = Product::find($id);

        $product->fill($request->input())->detail->fill(request(['info', 'highlight']));

        if(!is_string($request->primary_image)) {
            $primary_image_path = Storage::put('eshopkh', $request->primary_image, 'public');
            $product->detail->primary_image = Storage::url($primary_image_path);
        }
        if(!is_string($request->secondary_image2)) {
            $secondary_image1_path = Storage::put('eshopkh', $request->secondary_image1, 'public');
            $product->detail->secondary_image1 = Storage::url($secondary_image1_path);
        }
        if(!is_string($request->secondary_image2)) {
            $secondary_image2_path = Storage::put('eshopkh', $request->secondary_image2, 'public');
            $product->detail->secondary_image2 = Storage::url($secondary_image2_path);
        }

        $product->save();
        $product->detail->save();

        return redirect('admin/inventory');
    }

    public function destroy($id)
    {
        Product::find($id)->delete();

        return redirect()->back();
    }

    public function destroyMany(Request $request)
    {
        // dd($request->all());
        Product::whereIn('id', $request->data)->delete();

        return redirect()->back();
    }
}
