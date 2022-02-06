<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
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
