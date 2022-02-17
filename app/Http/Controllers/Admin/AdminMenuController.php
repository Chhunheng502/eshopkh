<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class AdminMenuController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Login');
    }
}
