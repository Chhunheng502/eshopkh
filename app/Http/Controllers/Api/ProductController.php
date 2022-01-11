<?php

namespace App\Http\Controllers\Api;

use App\Models\Product;
use App\Models\Collection;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $data = Product::join('product_detail', 'products.id', '=', 'product_detail.product_id')
            ->select('products.id', 'products.name', 'products.price', 'products.feature', 'products.quantity', 'products.type',
            'product_detail.primary_image', 'product_detail.secondary_image1', 'product_detail.secondary_image2', 'product_detail.info',
            'product_detail.highlight')
            ->get();

        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $product = Product::create([
            'name' => $request->name,
            'price' => $request->price,
            'feature' => $request->feature,
            'quantity' => $request->quantity,
            'type' => $request->type
        ]);

        $product->getDetail()->create([
            'primary_image' => $request->primary_image,
            'secondary_image1' => $request->secondary_image1,
            'secondary_image2' => $request->secondary_image2,
            'info' => $request->info,
            'highlight' => $request->highlight
        ]);

        return $product->id;
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $product = Product::find($id);
        $detail = Product::find($id)->getDetail;

        $product->name = $request->name;
        $product->price = $request->price;
        $product->feature = $request->feature;
        $product->quantity = $request->quantity;

        $detail->primary_image = $request->primary_image;
        $detail->secondary_image1 = $request->secondary_image1;
        $detail->secondary_image2 = $request->secondary_image2;
        $detail->info = $request->info;
        $detail->highlight = $request->highlight;

        $result1 = $product->save();
        $result2 = $detail->save();

        if($result1 && $result2)
        {
            return $id . ' has been edited';
        }
        else
        {
            return $id . ' has failed to edit';
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
        $product = Product::find($id);

        $product->quantity = $request->quantity;
        $result = $product->save();

        if($result)
        {
            return  'quantity of ' . $id . ' has been updated';
        }
        else
        {
            return  'quantity of ' . $id . ' has failed to update';
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $product = Product::find($id);
        $detail = Product::findOrFail($id)->getDetail()->delete();

        $collections = Collection::all();

        foreach($collections as $collection)
        {
            $query = Collection::findOrFail($collection->id)->getProducts()
            ->where('product_id', $id)->delete();
        }

        $result = $product->delete();

        if($result)
        {
            return $id . ' has been deleted';
        }
        else
        {
            return $id . ' has failed to delete';
        }
    }
}
