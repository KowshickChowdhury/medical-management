<?php

namespace App\Http\Controllers;

use App\Http\Requests\AuthRequest;
use App\Models\User;
use App\Traits\CommonTrait;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    use CommonTrait;
    public function __construct(User $user)
    {
        $this->user = $user;
    }
    
    public function register(Request $request)
    {
        // dd($request);
        $input = $request->all();
        $rules = [
            'name' => 'required|min:3|max:50',
            'email' => 'email|required|string|unique:users,email',
            'account_type' => 'required|in:Individual,Business',
            'password' => 'min:8|required',
        ];

        $valid = Validator::make($request->all(), $rules);
        if ($valid->fails()) return $this->sendError($valid->errors());;

        $user =  $this->user->saveUser($input);

        // Auth::login($user);
        // $user->roles = $user->getRoleNames();
        // $input['device_name'] = $this->getDeviceName();
        return $this->sendResponse(['message' => 'Registration has completed', 'success' => true, 'data' => $user]);

        // return $this->sendResponse(['user' => $user, 'token' => $user->createToken($input['device_name'])->plainTextToken]);
    }

    public function login(AuthRequest $request)
    {
        $user = (new User())->getUserByEmail($request->all());
        if ($user && Hash::check($request->input('password'), $user->password)) {
            $user_data['token'] = $user->createToken($user->email)->plainTextToken;
            $user_data['name'] = $user->name;
            $user_data['email'] = $user->email;
            return $this->sendResponse(['message' => 'User has authenticated', 'success' => true, 'data' => $user_data]);
        }
        throw ValidationException::withMessages([
            'email' => ['The Provided credentials are incorret']
        ]);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();
        return $this->sendResponse(['msg' => 'You have successfully logged out']);
    }
}
