<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CollectionDetail;
use App\Services\CollectionService;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class CollectionDetailController extends Controller
{
    protected $collectionService;

    public function __construct(CollectionService $collectionService)
    {
        $this->collectionService = $collectionService;
    }

    public function store(Request $request, $id)
    {
        //might want to improve this logic
        try {
            foreach ($request->data as $product_id) {
               $this->collectionService->addProduct($id, $product_id);
            }
         } catch (QueryException $exception) {
            if($exception->getCode() == 23000) {
                return back()->with([
                    'message' => 'Duplicate items'
                ]);
            }
         }

         //doesn't work because you put the route in api route
        return back()->with([
            'message' => 'Added to collection successfully'
        ]);
    }

    public function destroy($id)
    {
        CollectionDetail::where('product_id', $id)->delete();

        return redirect()->back();
    }
}
