<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\AdminLoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminSessionController extends Controller
{
    public function store(AdminLoginRequest $request)
    {
        if(Auth::guard('admin')->attempt($request->validated())) {
            return redirect()->intended('admin/overview');
        }

        return redirect()->back();
    }

    public function destroy(Request $request)
    {
        Auth::guard('admin')->logout();

        $request->session()->invalidate();
    
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
