<?php

namespace App\Http\Controllers\Api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\UserRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(UserRequest $request)
    {
        if(User::create($request->validated())) {
            return redirect()->intended('/');
        }

        return redirect()->back();
    }

    public function show($id)
    {
        $data = User::findOrFail($id);

        return $data;
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $user->first_name = $request->first_name;
        $user->last_name = $request->last_name;
        $user->email = $request->email;
        $user->phone = $request->phone;
        $user->address = $request->address;
        if(isset($request->password))
        {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return $user;
    }
}
