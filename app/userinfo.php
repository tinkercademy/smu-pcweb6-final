<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class userinfo extends Model
{
    protected $fillable = [
        'username', 'password',
    ];
}
