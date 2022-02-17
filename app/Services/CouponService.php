<?php

namespace App\Services;

use App\Jobs\ProcessCoupon;
use App\Mail\CouponReceived;
use App\Models\User;
use App\Models\UserCoupon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class CouponService
{
    public function get()
    {
        return UserCoupon::with('product')
                        ->where('user_id', Auth::id())
                        ->isValid()
                        ->get();
    }

    public function store($coupon)
    {
        foreach($coupon->user_ids as $user_id) {
            $coupon->merge(['code' => Str::random(6)]);
            $result = User::find($user_id)->coupons()->create($coupon->all());
            // need improvement (not an accurate time frame) - should convert to minute
            ProcessCoupon::dispatch($result)->delay(now()->addDays($result->expired_date));
            Mail::to(User::find($user_id))->send(new CouponReceived($result));
        }

        if($result) {
            return true;
        }
        
        return false;
    }

    public function validatedCode($code)
    {
        if(UserCoupon::where('code', $code)) {
            return true;
        }

        return false;
    }

    public function validatedAgaintCart($code, $cart)
    {
        $coupon = UserCoupon::where('code', $code)->get()[0];

        if($this->isBNGO($code)) {
            return count(array_filter($cart, fn($item) => $item == $coupon->product_id))
                    >= intval(str_replace('B', '', $coupon->type));            
        } else {
            return in_array($coupon->product_id, $cart);
        }

        return false;
    }

    // buy n get one
    public function isBNGO($code)
    {
        $coupon = UserCoupon::where('code', $code)->get()[0];

        if(str_contains($coupon->type, 'B')) {
            return true;
        }

        return false;
    }

    public function getFreeProduct($code)
    {
        $coupon = UserCoupon::where('code', $code)->get()[0];

        UserCoupon::where('code', $code)->delete();

        return $coupon->product;
    }


    public function redeem($code)
    {
        $coupon = UserCoupon::with('product')->where('code', $code)->get()[0];

        if(str_contains($coupon->type, 'FD')) {
            $value = 5;
        } else if(str_contains($coupon->type, 'D')) {
            $value = ($coupon->product->price / 100) * intval(str_replace('D', '', $coupon->type));
        } else {
            $value = intval(str_replace('S', '', $coupon->type));
        }

        $coupon->delete();

        return $value;
    }
}