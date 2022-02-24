<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\CollectionStoreRequest;
use App\Repositories\CollectionRepository;
use App\Services\CollectionService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CollectionController extends Controller
{
    protected $collectionRepository;
    protected $collectionService;

    public function __construct(
        CollectionRepository $collectionRepository,
        CollectionService $collectionService
    )
    {
        $this->collectionRepository = $collectionRepository;
        $this->collectionService = $collectionService;
    }

    public function index()
    {
        return Inertia::render('Admin/Product/Collection/Index', [
            'collections' => $this->collectionRepository->getAllWithDetailCount()
        ]);
    }

    public function show($id)
    {
        return Inertia::render('Admin/Product/Collection/Detail', [
            'collection' => $this->collectionRepository->getWithDetailById($id)
        ]);
    }

    public function store(CollectionStoreRequest $request)
    {
        $this->collectionRepository->create($request);

        return back()->with([
            'message' => 'Created successfully'
        ]);
    }

    public function update(Request $request, $id)
    {
        $this->collectionRepository->update($request, $id);

        return back()->with([
            'message' => 'Updated successfully'
        ]);
    }

    public function destroy($id)
    {
        $this->collectionRepository->delete($id);

        return back()->with([
            'message' => 'Deleted successfully'
        ]);
    }
}
