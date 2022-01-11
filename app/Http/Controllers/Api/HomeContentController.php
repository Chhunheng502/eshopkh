<?php

namespace App\Http\Controllers\Api;

use App\Models\HomeContent;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class HomeContentController extends Controller
{
    public function getContent() 
    {
        $data = HomeContent::all();

        return $data;
    }

    public function editContent(Request $request) 
    {
        foreach($request->data as $data)
        {
            $result = HomeContent::find($data['id']);

            $result->image = $data['image'];
            $result->title = $data['title'];
            $result->content = $data['content'];

            $result->save();
        }
    }
}
