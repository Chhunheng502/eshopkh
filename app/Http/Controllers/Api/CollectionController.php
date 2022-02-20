<?php

namespace App\Http\Controllers\Api;

use App\Models\Collection;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CollectionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $collections = Collection::all();

        $result = [];

        foreach($collections as $collection)
        {
            $products = Collection::findOrFail($collection->id)->getProducts;

            $product_data = [];

            foreach($products as $product)
            {
                $temp = Product::join('product_detail', 'products.id', '=', 'product_detail.product_id')
                ->select('products.id', 'products.name', 'products.price', 'products.feature', 'products.quantity', 'products.type',
                'product_detail.primary_image', 'product_detail.secondary_image1', 'product_detail.secondary_image2', 'product_detail.info',
                'product_detail.highlight')
                ->where('products.id', $product->product_id)
                ->get();

                array_push($product_data, $temp);
            }

            $data = [
                'id' => $collection->id,
                'name' => $collection->name,
                'image' => $collection->image,
                'products' => $product_data
            ];

            array_push($result, $data);
        }

        return $result;
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
        $image_path = Storage::put('eshopkh', $request->image, 'public');
        
        $collection = Collection::create([
            'name' => $request->name,
            'image' => Storage::url($image_path)
        ]);

        return $collection->id;
    }

    public function addProducts(Request $request, $id)
    {
        $collection = Collection::find($id);

        $arr = $request->products;

        for($i = 0; $i < count($arr); $i++)
        {
            $collection->getProducts()->create([
                'product_id' => $arr[$i]['id']
            ]);
        }

        return response()->json(['collection' => $collection]);
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request, $id)
    {
        $collection = Collection::find($id);

        $collection->name = $request->name;
        $collection->image = $request->image;

        $result = $collection->save();

        if($result)
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
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $collection = Collection::find($id);
        $products = Collection::findOrFail($id)->getProducts()->delete();

        $result = $collection->delete();

        if($result)
        {
            return $id . ' has been deleted';
        }
        else
        {
            return $id . ' has failed to delete';
        }
    }

    public function destroyProduct(Request $request)
    {
        $result = Collection::find($request->collection_id)->getProducts()
        ->where('product_id', $request->product_id)->delete();

        if($result)
        {
            return 'success';
        }
        else
        {
            return 'failed';
        }
    }
}
