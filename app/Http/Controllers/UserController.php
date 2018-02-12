<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
   public function index(Request $request)
    {
        $data = [];
        $data['name'] = $request->user()->name;
        $data['email'] = $request->user()->email;
        return response()->json([
            'data' => $data,
        ]);
    }
	   public function index2(Request $request)
    {
        $data = [];
       $data['name'] = $request->user()->name;
             return response()->json([
            'data' => $data,
        ]);
    }
	
	
}
