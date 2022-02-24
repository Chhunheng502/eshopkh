<?php

namespace App\Repositories;

use App\Services\ProductService;

class ProductRepository extends AbstractRepository implements EloquentDetailInterface
{
    protected $productService;
    
    public function __construct(ProductService $productService)
    {
        parent::__construct();

        $this->productService = $productService;
    }

    // this method is not used
    public function getFirstWithDetail()
    {
        return $this->model->with('detail')->first();
    }

    public function getWithDetailById($id)
    {
        return $this->model->with('detail')->find($id);
    }

    public function getAllWithDetail()
    {
        return $this->model->withDetail();
    }

    public function getWithNecessaryDetail()
    {
        return $this->model->with(['detail' => function($query) {
                            $query->selectNecessary();
                        }])->get();
    }

    public function getAllForAdmin()
    {
        return $this->model->with('detail')
                ->filter(request([
                    'gender',
                    'type',
                    'search',
                    'sort',
                ]))
                ->paginate(15)
                ->withQueryString();
    }

    public function getByType($type)
    {
        return $this->model->type($type)->withDetail();
    }

    public function getByCollection($id)
    {
        return $this->model->collection($id)->withDetail();
    }

    public function create($request)
    {
        $product = $this->model->create($request->validated());

        $primary_image_path = $this->productService->uploadImage($request->file('primary_image'));
        $secondary_image1_path = $this->productService->uploadImage($request->file('secondary_image1'));
        $secondary_image2_path = $this->productService->uploadImage($request->file('secondary_image2'));

        $product->detail()->create([
            'primary_image' => $primary_image_path,
            'secondary_image1' => $secondary_image1_path,
            'secondary_image2' => $secondary_image2_path,
            'info' => $request->info,
            'highlight' => $request->highlight
        ]);

        return true;
    }

    public function update($request, $id)
    {
        $product = $this->getById($id);

        $product->fill($request->input())->detail->fill(request(['info', 'highlight']));

        if(!is_string($request->primary_image)) {
            $product->detail->primary_image = $this->productService->uploadImage($request->file('primary_image'));
        }
        if(!is_string($request->secondary_image2)) {
            $product->detail->secondary_image1 = $this->productService->uploadImage($request->file('secondary_image1'));
        }
        if(!is_string($request->secondary_image2)) {
            $product->detail->secondary_image2 = $this->productService->uploadImage($request->file('secondary_image2'));
        }

        $product->save();
        $product->detail->save();

        return true;
    }
}
