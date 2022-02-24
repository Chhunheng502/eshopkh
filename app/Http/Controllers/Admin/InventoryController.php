<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Models\Collection;
use App\Repositories\CollectionRepository;
use App\Repositories\ProductRepository;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    protected $productRepository;
    protected $productService;
    protected $collectionRepository;

    public function __construct(
        ProductRepository $productRepository,
        ProductService $productService,
        CollectionRepository $collectionRepository
    )
    {
        $this->productRepository = $productRepository;
        $this->productService = $productService;
        $this->collectionRepository = $collectionRepository;
    }

    public function index()
    {
        return Inertia::render('Admin/Product/Inventory/Index', [
            'products' => $this->productRepository->getAllForAdmin(),
            'collections' => $this->collectionRepository->getAll(),
            'filters'  => [
                'gender' => request('gender'),
                'type' => request('type'),
                'search' => request('search'),
                'sort' => request('sort')
            ]
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Product/Inventory/Create');
    }

    public function store(ProductStoreRequest $request)
    {
        if($this->productRepository->create($request)) {
            return redirect('admin/inventory')->with([
                'message' => 'Created successfully'
            ]);
        }

        return back()->with([
            'message' => 'Not successful'
        ]);
    }

    public function edit($id)
    {
        return Inertia::render('Admin/Product/Inventory/Edit', [
            'product' => $this->productRepository->getWithDetailById($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        if($this->productRepository->update($request, $id)) {
            return redirect('admin/inventory')->with([
                'message' => 'Updated successfully'
            ]);
        }

        return back()->with([
            'message' => 'Not successful'
        ]);
    }

    public function destroy($id)
    {
        $this->productRepository->delete($id);

        return back()->with([
            'message' => 'Deleted successfully'
        ]);
    }

    public function destroyMany(Request $request)
    {
        $this->productRepository->deleteByIds($request->data);

        return back()->with([
            'message' => 'Deleted successfully'
        ]);
    }
}
