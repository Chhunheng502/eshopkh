<?php

namespace App\Mail;

use App\Models\UserCoupon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CouponReceived extends Mailable
{
    use Queueable, SerializesModels;

    protected $coupon;

    public function __construct(UserCoupon $coupon)
    {
        $this->coupon = $coupon;
    }


    public function build()
    {
        return $this->markdown('emails.coupons.dispatched', [
            'coupon' => $this->coupon
        ]);
    }
}
