<?php

namespace App\Repositories;

use App\Jobs\ProcessCoupon;
use App\Mail\CouponReceived;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;

class UserCouponRepository extends AbstractRepository
{
    public function getValid()
    {
        return $this->model->with('product')
                        ->where('user_id', auth()->id())
                        ->isValid()
                        ->get();
    }

    public function store($request)
    {
        // need improvement - create function or class for some operation
        foreach($request->user_ids as $user_id) {
            $request->merge(['code' => Str::random(6)]);
            $result = User::find($user_id)->coupons()->create($request->all());
            // need improvement (not an accurate time frame) - should convert to minute
            ProcessCoupon::dispatch($result)->delay(now()->addDays($result->expired_date));
            Mail::to(User::find($user_id))->send(new CouponReceived($result));
        }

        if($result) {
            return true;
        }
        
        return false;
    }
}
