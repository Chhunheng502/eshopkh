<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CollectionStoreRequest;
use App\Models\Collection;
use App\Services\CollectionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    protected $collection;
    protected $collectionService;

    public function __construct(
        Collection $collection,
        CollectionService $collectionService
    )
    {
        $this->collection = $collection;
        $this->collectionService = $collectionService;
    }

    public function index()
    {
        return Inertia::render('Admin/Product/Collection/Index', [
            'collections' => $this->collection->getAll()
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Admin/Product/Collection/Detail', [
            'collection' => $this->collection->getCollection($id)
        ]);
    }

    public function store(CollectionStoreRequest $request)
    {
        $image_path = $this->collectionService->uploadImage($request->validated()['image']);

        Collection::create([
            'name' => $request->validated()['name'],
            'image' => $image_path
        ]);

        return back()->with([
            'message' => 'Created successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        $collection = Collection::find($id);

        $collection->name = $request->name;

        if(!is_string($request->image)) {
            $image_path = $this->collectionService->uploadImage($request->image);
            $collection->image = $image_path;
        }

        $collection->save();

        return back()->with([
            'message' => 'Updated successfully'
        ]);
    }

    public function destroy($id)
    {
        Collection::find($id)->delete();

        return back()->with([
            'message' => 'Deleted successfully'
        ]);
    }
}
