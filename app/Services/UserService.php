<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Support\Facades\Auth;

class UserService
{
    public function getTotalOrders()
    {
        return count(Auth::user()->orders);
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
        return count(Auth::user()->coupons);
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

    public function update($data, $user)
    {
        $user->update($data->only([
                'first_name',
                'last_name',
                'email',
                'phone',
                'address'
        ]));

        if(request()->has('password')) {
            $user->update(['password' => $data->password]);
        }

        return true;
    }
}