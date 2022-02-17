<?php

namespace App\Http\Controllers\Admin;

use App\Models\Order;
use App\Http\Controllers\Controller;
use App\Jobs\ProcessOrder;
use App\Services\OrderService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    protected $order;
    protected $orderService;

    public function __construct(Order $order, OrderService $orderService)
    {
        $this->order = $order;
        $this->orderService = $orderService;
    }

    public function index()
    {
        return Inertia::render('Admin/Customer/Order', [
            'orders' => $this->order->getNew()
        ]);
    }

    public function store(Request $request)
    {
        $order = Order::create([
            'user_id' => $request->user()->id,
            'total_cost' => $this->orderService->getTotalCost($request->orders, $request->reduction),
        ]);

        ProcessOrder::dispatch($order)->delay(now()->addDays(3));

        $request->user()->charge(intVal($order->total_cost), $request->paymentMethod); // couldn't implement decimal value...

        $sortedOrders = $this->orderService->sort($request->orders);

        foreach($sortedOrders as $product) {
            $order->detail()->create([
                'product_id' => $product['id'],
                'product_name' => $product['name'],
                'product_price' => $product['price'],
                'quantity' => $this->orderService->getQuantity($request->orders, $product['id']),
            ]);
        }

        return redirect('/');
    }

    public function accept($id)
    {
        $order = Order::find($id);

        $order->is_accepted = true;

        $order->save();

        return redirect()->back();
    }
}
