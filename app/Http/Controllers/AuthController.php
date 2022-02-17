<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdminLoginRequest;
use App\Http\Requests\UserLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function userLogin(UserLoginRequest $request)
    {
        if(Auth::attempt($request->validated())) {
            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return redirect()->back();
    }

    public function userLogout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
    
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function adminLogin(AdminLoginRequest $request)
    {
        if(Auth::guard('admin')->attempt($request->validated())) {
            return redirect()->intended('admin/overview');
        }

        return redirect()->back();
    }

    public function adminLogout()
    {
        
    }
}
