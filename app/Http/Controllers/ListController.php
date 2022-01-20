<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Lists;

class ListController extends Controller
{
    // get list from database
    public function getlist()
    {
        $lists = Lists::get();
        return response()->json($lists);
    }

    // save data to database
    public function postlist(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);
        $lists = Lists::create($request->all());
        return response()->json($lists);
    }

    //change position of data
    public function changePosition(Request $request) 
    {
        foreach ($request->selected as $key => $value) {
            $position = '';
            if ($value['position'] == 'right') {
                $position = 'left';
            } else {
                $position = 'right';
            }
            $list = Lists::find($value['id']);
            $list->position = $position;
            $list->save();
        }
        return response()->json($list);
        
    }
}
