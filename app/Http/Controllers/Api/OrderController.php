<?php

namespace App\Http\Controllers\Api;

use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        return [
            'orders' => Order::with(['detail', 'user'])
                        ->where('is_accepted', false)
                        ->paginate(15)
        ];
    }

    public function store(Request $request) {
        // $request->user()->createAsStripeCustomer(); (put this in register logic)
        // $request->user()->updateDefaultPaymentMethod($request->paymentMethod);
        // $request->user()->invoiceFor('One Time Fee', 1500);

        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_cost' => $this->orderService->getTotalCost($request->data),
        ]);

        $request->user()->charge($order->total_cost, $request->paymentMethod);

        $sortedOrders = $this->orderService->sort($request->data);

        foreach($sortedOrders as $product) {
            $order->detail()->create([
                'product_id' => $product['id'],
                'product_name' => $product['name'],
                'product_price' => $product['price'],
                'quantity' => $this->orderService->getQuantity($request->data, $product['id']),
            ]);
        }

        return redirect('/');
    }

    public function acceptOrder($id)
    {
        $order = Order::find($id);

        $order->is_accepted = true;

        $order->save();

        return redirect()->back();
    }
}
