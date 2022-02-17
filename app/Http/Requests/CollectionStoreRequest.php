<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CollectionStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'name' => ['required'],
            'image' => ['required'],
        ];
    }
}
