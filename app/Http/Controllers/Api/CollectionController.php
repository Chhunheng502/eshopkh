<?php

namespace App\Http\Controllers\Api;

use App\Models\Collection;
use App\Http\Controllers\Controller;
use App\Models\CollectionDetail;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    public function index()
    {
        $collections = Collection::with(['detail' => function($query) {
            $query->with(['product' => function($query) {
                $query->with('detail');
            }]);
        }])->get();

        return $collections;
    }

    public function store(Request $request)
    {
        $collection = Collection::create([
            'name' => $request->name,
            'image' => $request->image
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

    public function show($id)
    {
        $collectionDetail = CollectionDetail::with(['product' => function($query) {
            $query->with('detail');
        }])->where('collection_id', $id)->get();

        $products = [];

        foreach($collectionDetail as $collection) {
            array_push($products, $collection['product']);
        };

        return Inertia::render('Product/List', [
            'products' => $products
        ]);
    }

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
