<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CouponStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'user_ids' => ['required'],
            'product_id' => ['required', 'numeric', 'gt:0'],
            'type' => ['required', 'min:2', 'max:5'],
            'expired_date' => ['required', 'date', 'after:now']
        ];
    }
}
