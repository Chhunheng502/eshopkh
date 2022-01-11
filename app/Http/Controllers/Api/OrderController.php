<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $orders = Order::all();

        $result = [];

        foreach($orders as $order)
        {
            $details = Order::find($order->id)->getDetail;

            $order_data = [];

            foreach($details as $detail)
            {
                $product_data = [
                    'product_id' => $detail->product_id,
                    'product_name' => $detail->product_name,
                    'product_price' => $detail->product_price
                ];

                $temp = [
                    'product_data' => $product_data,
                    'quantity' => $detail->quantity
                ];

                array_push($order_data, $temp);
            }

            $data = [
                'id' => $order->id,
                'is_accepted' => $order->is_accepted,
                'user' => User::find($order->user_id),
                'total_cost' => $order->total_cost,
                'payment' => $order->payment,
                'date' => $order->created_at,
                'order_data' => $order_data
            ];

            array_push($result, $data);
        }

        return $result;
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

        $check = $request->detail;

        $outOfStock = [];

        $result = true;

        for($i = 0; $i < count($check); $i++)
        {
            $product = Product::find($check[$i]['product_id']);

            if($check[$i]['quantity'] > $product->quantity)
            {
                $temp = [
                    'name' => $product->name,
                    'quantity' => $product->quantity
                ];
                array_push($outOfStock, $temp);
                $result = false;
            }
        }

        if($result)
        {
            $order = Order::create([
                'user_id' => $request->user_id,
                'total_cost' => $request->total_cost,
                'payment' => $request->payment,
                'is_accepted' => $request->is_accepted
            ]);
    
            $arr = $request->detail;
    
            for($i = 0; $i < count($arr); $i++)
            {
                $order->getDetail()->create([
                    'product_id' => $arr[$i]['product_id'],
                    'product_name' => $arr[$i]['product_name'],
                    'product_price' => $arr[$i]['product_price'],
                    'quantity' => $arr[$i]['quantity']
                ]);

                $product = Product::find($arr[$i]['product_id']);
                $product->quantity = $product->quantity - $arr[$i]['quantity'];
                $product->save();
            }

            return 'success';
        }
        else
        {
            return response()->json(['Out of stock' => $outOfStock]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $data = $this->index();

        $result = [];

        foreach($data as $i) {

            if($i['user']['id'] == $id)
            {
                unset($i['user']);
                array_push($result, $i);
            }
        }

        return $result;
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
    public function update($id)
    {
        $order = Order::find($id);

        $order->is_accepted = true;

        $result = $order->save();

        if($result)
        {
            return $id . ' has been updated';
        }
        else
        {
            return $id . ' has failed to updated';
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $order = Order::find($id);
        $products = Order::findOrFail($id)->getDetail()->delete();

        $result = $order->delete();

        if($result)
        {
            return $id . ' has been deleted';
        }
        else
        {
            return $id . ' has failed to delete';
        }
    }
}
