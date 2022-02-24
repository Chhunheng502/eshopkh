<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\CollectionRepository;
use Illuminate\Database\QueryException;
use Illuminate\Http\Request;

class CollectionDetailController extends Controller
{
    protected $collectionRepository;

    public function __construct(CollectionRepository $collectionRepository)
    {
        $this->collectionRepository = $collectionRepository;
    }

    public function store(Request $request, $id)
    {
        //might want to improve this logic
        try {
            foreach ($request->data as $product_id) {
               $this->collectionRepository->addProduct($id, $product_id);
            }
         } catch (QueryException $exception) {
            if($exception->getCode() == 23000) {
                return back()->with([
                    'message' => 'Duplicate items'
                ]);
            }
         }

        return back()->with([
            'message' => 'Added to collection successfully'
        ]);
    }

    public function destroy($id)
    {
        $this->collectionRepository->deleteProduct($id);

        return redirect()->back();
    }
}
