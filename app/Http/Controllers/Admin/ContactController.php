<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ContactController extends Controller
{
    protected $user;

    public function __construct(User $user)
    {
        $this->user = $user;
    }

    public function index()
    {
        return Inertia::render('Admin/Customer/Contact', [
            'users' => User::filter(request(['search', 'sort']))
                                ->paginate(15)
                                ->withQueryString(),
            'products' => Product::with(['detail' => function($query) {
                                $query->selectNecessary();
                            }])->get()
        ]);
    }
}
