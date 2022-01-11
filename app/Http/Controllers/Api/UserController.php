<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Models\Product;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $data = User::all();

        return $data;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
        $data = new User();

        $data->first_name = $request->get('first_name');
        $data->last_name = $request->get('last_name');
        $data->email = $request->get('email');
        $data->password = Hash::make($request->get('password'));
        $data->gender = $request->get('gender');
        $data->age = $request->get('age');
        $data->phone = $request->get('phone');
        $data->address = $request->get('address');

        $data->save();

        return response()->json(['data' => $data]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = User::findOrFail($id);

        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        if(isset($request->password))
        {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return $user;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function createUserPromoCode(Request $request, $id)
    {
        $promo = User::find($id)->getPromo()->create([
            'product_id' => $request->product_id,
            'coupon_type' => $request->coupon_type,
            'promo_code' => $request->promo_code
        ]);

        return response()->json(['promo' => $promo]);
    }

    public function getUserPromoCode($id)
    {
        $promo = User::find($id)->getPromo;

        $result = [];

        foreach($promo as $i)
        {
            $product = Product::find($i->product_id);

            $data = [
                'id' => $i->id,
                'coupon_type' => $i->coupon_type,
                'promo_code' => $i->promo_code,
                'product_name' => $product->name,
                'product_feature' => $product->feature,
                'date' => $i->created_at
            ];
            
            array_push($result, $data);
        }

        return $result;
    }

    public function redeemUserPromoCode(Request $request, $id)
    {
        $data = User::findOrFail($id)->getPromo()->where('promo_code', $request->promo_code)->get();

        return $data;
    }

    public function destroyUserPromoCode(Request $request, $id)
    {
        $msg = ' ';

        foreach($request->promo_code as $code)
        {
            $result  = User::findOrFail($id)->getPromo()->where('promo_code', $code)->delete();

            if($result)
            {
                $msg = 'successfully deleted';
            }
            else
            {
                $msg = 'failed to delete';
            }
        }

        return $msg;
    }

    public function createUserWishlist($user_id, $product_id)
    {
        $wishlist = User::find($user_id)->getWishlist()->create([
            'product_id' => $product_id
        ]);

        return response()->json(['wishlist' => $wishlist]);
    }

    public function getUserWishlist($id)
    {
        $wishlist = User::find($id)->getWishlist;

        $result = [];

        foreach($wishlist as $i)
        {
            $product = Product::join('product_detail', 'products.id', '=', 'product_detail.product_id')
            ->select('products.id', 'products.name', 'products.price', 'products.feature', 'products.type', 'product_detail.primary_image')
            ->where('products.id', $i->product_id)->get();
            
            array_push($result, $product);
        }

        return $result;
    }

    public function destroyUserWishlist($user_id, $product_id)
    {

        $result  = User::find($user_id)->getWishlist()->where('product_id', $product_id)->delete();

        if($result)
        {
            return 'successfully deleted';
        }
        else
        {
            return 'failed to delete';
        }
    }
}
