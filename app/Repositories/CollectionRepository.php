<?php

namespace App\Repositories;

use App\Models\CollectionDetail;
use App\Services\CollectionService;

class CollectionRepository extends AbstractRepository implements EloquentDetailInterface
{
    protected $collectionService;

    public function __construct(CollectionService $collectionService)
    {
        parent::__construct();

        $this->collectionService = $collectionService;
    }

    public function getFirstWithDetail()
    {
        return $this->model->withDetail()->first();
    }

    public function getWithDetailById($id)
    {
        return CollectionDetail::withDetail()
        ->where('collection_id', $id)
        ->paginate(15);
    }

    // this method is not used
    public function getAllWithDetail()
    {
        return $this->model->with('detail')->get();
    }

    public function getAllWithDetailCount()
    {
        return $this->model->withCount('detail')
                    ->paginate(15);
    }

    public function create($request)
    {
        $image_path = $this->collectionService->uploadImage($request->validated()['image']);

        $this->model->create([
            'name' => $request->validated()['name'],
            'image' => $image_path
        ]);

        return true;
    }

    public function update($request, $id)
    {
        $collection = $this->getById($id);

        $collection->name = $request->name;

        if(!is_string($request->image)) {
            $image_path = $this->collectionService->uploadImage($request->image);
            $collection->image = $image_path;
        }

        $collection->save();

        return true;
    }

    public function addProduct($collection_id, $product_id)
    {
        $this->model->find($collection_id)->detail()->create([
            'product_id' => $product_id
        ]);

        return true;
    }

    public function deleteProduct($id)
    {
        return CollectionDetail::where('product_id', $id)->delete();
    }
}
