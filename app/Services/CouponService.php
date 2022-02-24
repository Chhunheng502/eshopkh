<?php

namespace App\Services;

use App\Models\UserCoupon;

class CouponService
{
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