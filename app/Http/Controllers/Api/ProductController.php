<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::with('detail')
        ->filter(request(['search']))
        ->get();
        
        return Inertia::render('Product/List', [
            'products' => $products
        ]);
    }

    public function showType($type)
    {
        $products = Product::with('detail')
                ->where('type', $type)
                ->get();

        return Inertia::render('Product/List', [
            'products' => $products
        ]);
    }

    public function showProduct($type, $id)
    {
        $product = Product::with('detail')
        ->where('id', $id)
        ->get();

        return Inertia::render('Product/Detail', [
            'product' => $product[0]
        ]);
    }

    public function store(Request $request)
    {

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'feature' => $request->feature,
            'quantity' => $request->quantity,
            'type' => $request->type
        ]);

        $product->detail()->create([
            'primary_image' => $request->primary_image,
            'secondary_image1' => $request->secondary_image1,
            'secondary_image2' => $request->secondary_image2,
            'info' => $request->info,
            'highlight' => $request->highlight
        ]);

        return $product->id;
    }

    public function updateProduct(Request $request, $id)
    {
        $product = Product::find($id);

        $product->name = $request->name;
        $product->price = $request->price;
        $product->feature = $request->feature;
        $product->quantity = $request->quantity;

        $product->detail->primary_image = $request->detail->primary_image;
        $product->detail->secondary_image1 = $request->detail->secondary_image1;
        $product->detail->secondary_image2 = $request->detail->secondary_image2;
        $product->detail->info = $request->detail->info;
        $product->detail->highlight = $request->detail->highlight;

        $product->save();

        return response('Success');
    }

    public function updateQuantity(Request $request, $id)
    {
        $product = Product::find($id);

        $product->quantity = $request->quantity;
        $product->save();

        return response('success');
    }

    public function destroy($id)
    {
        $product = Product::find($id);

        $product->delete();

        return response('success');
    }
}
