<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponStoreRequest;
use App\Services\CouponService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    protected $couponService;

    public function __construct(CouponService $couponService)
    {
        $this->couponService = $couponService;
    }

    public function index()
    {
        return Inertia::render('User/Coupon', [
            'coupons' => $this->couponService->get()
        ]);
    }

    public function store(CouponStoreRequest $request)
    {
        //can only use safe with CouponStoreRequest
        if($this->couponService->store($request)) {
            return back()->with([
                'message' => 'Dispatched Successfully'
            ]);
        }

        return back()->with([
            'message' => 'Not Successful'
        ]);
    }

    public function redeem(Request $request)
    {
        if(
            $this->couponService->validatedCode($request->code) &&
            $this->couponService->validatedAgaintCart($request->code, $request->cart)
        ) {

            if($this->couponService->isBNGO($request->code)) {
                return response()->json([
                    'success' => true,
                    'message' => 'Success',
                    'isBNGO' => true,
                    'product' =>  $this->couponService->getFreeProduct($request->code)
                ]);
            }

            return response()->json([
                'success' => true,
                'message' => 'Success',
                'couponValue' => $this->couponService->redeem($request->code)
            ]);
        }

        return response()->json([
            'success' => false,
            'message' => 'Not Successful'
        ]);
    }
}
