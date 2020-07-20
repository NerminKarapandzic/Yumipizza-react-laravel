<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $fillable = ['items', 'adress' , 'name', 'city' , 'email' , 'postal', 'total', 'count'];
}
