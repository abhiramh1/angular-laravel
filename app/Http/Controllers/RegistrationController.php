<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class RegistrationController extends Controller
{
   public function createUser(Request $request) {
       User::create($request->all());
   }
}
