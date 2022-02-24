<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function getTotalOrders()
    {
        return Auth::user()->orders->count();
    }

    public function getTotalSpending()
    {
        return array_reduce(
            Auth::user()->orders->toArray(),
            fn($total, $num) => $total + $num['total_cost'], 0
        );
    }

    public function getTotalCoupons()
    {
        return Auth::user()->coupons->count();
    }

    public function register($data)
    {
        $user = User::create($data);
        if($user) {
            $user->createAsStripeCustomer();
            Auth::login($user);
            return true;
        }
        
        return false;
    }
}