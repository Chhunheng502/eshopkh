<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'price' => ['required'],
            'feature' => ['required'],
            'quantity' => ['required'],
            'type' => ['required'],
            'primary_image' => ['required'],
            'secondary_image1' => ['required'],
            'secondary_image2' => ['required'],
            'info' => ['required'],
            'highlight' => ['required']
        ];
    }
}
