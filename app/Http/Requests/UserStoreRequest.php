<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserStoreRequest extends FormRequest
{
    public function rules()
    {
        return [
            'first_name' => ['required_with:last_name', 'max:25'],
            'last_name' => ['max:25'],
            'email' => ['required', 'email'],
            'password' => ['min:6', 'same:confirm_password'],
            'gender' => ['required'],
            'age' => ['required', 'numeric', 'min:15'],
            'phone' => ['required', 'min:8', 'max:10'],
            'address' => ['required'],   
        ];
    }
}
