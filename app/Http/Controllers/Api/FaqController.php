<?php

namespace App\Http\Controllers\Api;

use App\Models\Faq;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class FaqController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
  
    public function store(Request $request)
    {
        $faq = new Faq([
            'type' => $request->type,
            'question' => $request->question,
            'answer' => $request->answer
        ]);
        $faq->save();
        return response($faq,201);
    }

    public function index(){
        $data = Faq::all();
        return $data;
    }

    public function edit(Request $request, $id ){
        $faq = Faq::findOrFail($id);
        $faq->fill($request->input())->save();
        return $faq;
    }

    public function destroy (Request $request, $id ){
        $faq = Faq::findOrFail($id)->delete();
        return $faq;
    }


}

