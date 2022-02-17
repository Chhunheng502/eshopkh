<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;
use Laravel\Sanctum\HasApiTokens;
use Laravel\Cashier\Billable;

class User extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, HasFactory, Notifiable, Billable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = ['first_name','last_name','email','password','gender','age','phone','address'];

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
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function coupons()
    {
        return $this->hasMany(UserCoupon::class);
    }

    public function wishlists()
    {
        return $this->hasMany(UserWishlist::class);
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? false, fn($query, $search) =>
            $query->where(fn($query) =>
                $query->where('first_name', 'like', '%' . $search . '%')
                        ->orWhere('last_name', 'like', '%' . $search . '%')
            )
        );

        $query->when($filters['sort'] ?? false, fn($query, $sort) =>
            $sort=='all' ? '' : $query->where(fn($query) =>
                $query->where('gender', 'like', '%' . $sort . '%')
            )
        );

        $months = [
            'Jan' => 1,
            'Feb' => 2,
            'Mar' => 3,
            'Apr' => 4,
            'May' => 5,
            'Jun' => 6,
            'Jul' => 7,
            'Aug' => 8,
            'Sep' => 9,
            'Oct' => 10,
            'Nov' => 11,
            'Dec' => 12
        ];

        $query->when($filters['period'] ?? false, fn($query, $period) =>
            $period=='all' ? '' : $query->where(fn($query) =>
                $query->whereBetween('created_at', [
                        Carbon::createFromFormat('m', $months[$period])->startOfMonth(),
                        Carbon::createFromFormat('m', $months[$period])->endOfMonth()
                ])
        )
    );
    }

    public function scopeLastMonth()
    {
        return $this->whereBetween('created_at', [
                        Carbon::now()->startOfMonth()->subMonthsNoOverflow(),
                        Carbon::now()->subMonthsNoOverflow()->endOfMonth()
                    ]);
    }

    public function scopeCurrentMonth()
    {
        return $this->whereBetween('created_at', [
                        Carbon::now()->startOfMonth(),
                        Carbon::now()->endOfMonth()
                    ]);
    }

    public function setPasswordAttribute($value)
    {
        $this->attributes['password'] = Hash::make($value);
    }
}

