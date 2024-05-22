<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use App\Traits\CommonTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, CommonTrait;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'account_type',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function saveUser($input)
    {
        if (empty($input['name']) || empty($input['email']) || empty($input['account_type'])) {
            $email_arr = explode('@', $input['user_email']);
            $input['name'] = $email_arr[0];
            $input['email'] = $input['user_email'];
            $input['account_type'] = $input['account_type'];
        }
        $input['password'] = Hash::make($input['password']);
        
        $user = $this->create($input);
        $user = $user->fresh();
        return $user;
    }
//**     */

    public function getUserByEmail(array $input)
    {
        return self::query()->where('email',$input['email'])->first();
    }

    public function transactions()
    {
        return $this->hasMany(Transaction::class);
    }
}
