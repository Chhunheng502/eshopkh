<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function userRegister(Request $request)
    {
        $credentials = $request->validate([
            'first_name' => ['required_with:last_name', 'max:25'],
            'last_name' => ['max:25'],
            'email' => ['required', 'email'],
            'password' => ['min:6', 'same:confirm_password'],
            'gender' => ['required'], // if not provided, default value is required
            'age' => ['required', 'numeric', 'min:15'],
            'phone' => ['required', 'min:8', 'max:10'],
            'address' => ['required'],
        ]);

        if(User::create($credentials)) {
            return redirect()->intended('/');
        }

        return redirect()->back();
    }

    public function userLogin(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required'],
            'password' => ['required'],
        ]);

        if(Auth::attempt($credentials)) {
            return redirect()->intended('/');
        }

        return redirect()->back();
    }

    public function userLogout()
    {

    }

    public function adminLogin(Request $request)
    {
        $credentials = $request->validate([
            'name' => ['required'],
            'password' => ['required'],
        ]);

        if(Auth::guard('admin')->attempt($credentials)) {
            return redirect()->intended('admin/overview');
        }

        return redirect()->back();
    }

    public function adminLogout()
    {
        
    }
}
