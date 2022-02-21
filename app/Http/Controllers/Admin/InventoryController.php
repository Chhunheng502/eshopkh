<?php

namespace App\Http\Controllers\Admin;

use App\Models\Product;
use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use App\Models\Collection;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InventoryController extends Controller
{
    protected $product;
    protected $productService;

    public function __construct(Product $product, ProductService $productService)
    {
        $this->product = $product;
        $this->productService = $productService;
    }

    public function index()
    {
        return Inertia::render('Admin/Product/Inventory/Index', [
            'products' => $this->product->getAllForAdmin(),
            'collections' => Collection::get(),
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
        if($this->productService->create($request)) {
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
            'product' => Product::with('detail')->find($id)
        ]);
    }

    public function update(Request $request, $id)
    {
        if($this->productService->update($request, $id)) {
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
        Product::find($id)->delete();

        return back()->with([
            'message' => 'Deleted successfully'
        ]);
    }

    public function destroyMany(Request $request)
    {
        Product::whereIn('id', $request->data)->delete();

        return back()->with([
            'message' => 'Deleted successfully'
        ]);
    }
}
