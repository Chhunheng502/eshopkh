<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\UserLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserSessionController extends Controller
{
    public function store(UserLoginRequest $request)
    {
        if(Auth::attempt($request->validated())) {
            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return redirect()->back();
    }

    public function destroy(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
    
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
