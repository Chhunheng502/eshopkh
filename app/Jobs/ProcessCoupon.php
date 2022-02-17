<?php

namespace App\Jobs;

use App\Models\UserCoupon;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessCoupon implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $userCoupon;

    public function __construct(UserCoupon $userCoupon)
    {
        $this->userCoupon = $userCoupon;
    }

    public function handle()
    {
        $this->userCoupon->delete();
    }
}
