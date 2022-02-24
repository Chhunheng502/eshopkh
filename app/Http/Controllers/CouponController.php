<?php

namespace App\Http\Controllers;

use App\Http\Requests\CouponStoreRequest;
use App\Repositories\UserCouponRepository;
use App\Services\CouponService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CouponController extends Controller
{
    protected $couponRepository;
    protected $couponService;

    public function __construct(
        UserCouponRepository $couponRepository,
        CouponService $couponService
    )
    {
        $this->couponRepository = $couponRepository;
        $this->couponService = $couponService;
    }

    public function index()
    {
        return Inertia::render('User/Coupon', [
            'coupons' => $this->couponRepository->getValid()
        ]);
    }

    public function store(CouponStoreRequest $request)
    {
        //can only use safe with CouponStoreRequest
        if($this->couponRepository->store($request)) {
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
