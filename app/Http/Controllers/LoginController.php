<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class LoginController extends Controller
{
    public function login (Request $request) { 
        $userName = $request->username;
        $password = $request->password;
        $userCount = User::select('name', 'email')->where('name', $userName)->where('password', $password)->first();
        if(!empty($userCount )) {
            return response()->json([
                'message' => 'Logged in Successfull',
                'status' => 1,
                'data' => $userCount,
                ]);
        } else {
            return response()->json([
                'message' => 'Invalid Credentials',
                'status' => 0,
                'data' => $userCount,
                ]);
        }
    }
}
