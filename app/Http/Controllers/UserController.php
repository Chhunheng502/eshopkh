<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use App\Services\UserService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    protected $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }

    public function index()
    {
        return Inertia::render('User/Profile', [
            'totalOrders' => $this->userService->getTotalOrders(),
            'totalSpending' => $this->userService->getTotalSpending(),
            'totalCoupons' => $this->userService->getTotalCoupons()
        ]);
    }

    public function store(UserStoreRequest $request)
    {
        if($this->userService->register($request->validated())) {
            return redirect()->intended('/');
        }

        return redirect()->back();
    }

    public function update(UserUpdateRequest $request, User $user)
    {
        if($this->userService->update($request->safe(), $user)) {
            return back()->with([
                'message' => 'Updated successfully'
            ]);
        }

        return back()->with([
            'message' => 'Not successful'
        ]);
    }
}
