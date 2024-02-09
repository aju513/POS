<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    //
    public function login(AuthRequest $request)
    {
        $user = User::where('email', $request['email'])->first();


        if ($user && Hash::check($request['password'], $user->password)) {
            $user_data['token'] = $user->createToken($user->email)->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['photo'] = $user->photo;
            $user_data['phone'] = $user->phone;
            return response()->json($user_data);
        }
        throw ValidationException::withMessages([
            'email' => ['The Proviced Credentials are incorrect']
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return response()->json(['msg' => 'You have succesfully logged out']);
    }
}
