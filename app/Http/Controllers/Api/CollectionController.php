<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\CollectionDetail;
use App\Services\CollectionService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class CollectionController extends Controller
{
    private $collectionService;

    public function __construct(CollectionService $collectionService)
    {
        $this->collectionService = $collectionService;
    }

    public function index()
    {
        return Collection::get();
    }

    public function store(Request $request)
    {
        $image_path = Storage::put('eshopkh', $request->image, 'public');

        Collection::create([
            'name' => $request->name,
            'image' => Storage::url($image_path)
        ]);

        return redirect()->back();
    }

    public function storeProduct(Request $request, $id)
    {
        //might want to improve this logic
        try {
            foreach ($request->data as $product_id) {
               $this->collectionService->addProduct($id, $product_id);
            }
         } catch (QueryException $exception) {
            if($exception->getCode() == 23000) {
                return back()->withErrors([
                    'message' => 'duplicate items'
                ]);
            }
         }

         //doesn't work because you put the route in api route
        return back()->with([
            'message' => 'success'
        ]);
    }

    public function update(Request $request, $id)
    {
        $collection = Collection::find($id);

        $collection->name = $request->name;

        if(!is_string($request->image)) {
            $image_path = Storage::put('eshopkh', $request->image, 'public');
            $collection->image = Storage::url($image_path);
        }

        $collection->save();

        return redirect()->back();
    }

    public function destroy($id)
    {
        Collection::find($id)->delete();

        return redirect()->back();
    }

    public function destroyProduct($id)
    {
        CollectionDetail::where('product_id', $id)->delete();

        return redirect()->back();
    }
}
