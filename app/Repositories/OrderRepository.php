<?php

namespace App\Repositories;

use App\Jobs\ProcessOrder;
use App\Services\OrderService;

class OrderRepository extends AbstractRepository
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        parent::__construct();
        
        $this->orderService = $orderService;
    }

    public function getNew()
    {
        return $this->model->with(['detail', 'user'])
                    ->where('is_accepted', false)
                    ->paginate(15);
    }

    public function getRecent()
    {
        return $this->model->recent()->with('user')->get();
    }

    public function create($request)
    {
        $order = $this->model->create([
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

        return true;
    }

    public function accept($id)
    {
        $order = $this->getById($id);

        $order->is_accepted = true;

        $order->save();

        return true;
    }
}
