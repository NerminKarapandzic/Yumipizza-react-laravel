<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Pizza;

class PizzasController extends Controller
{
    public function index(){
      $pizzas = Pizza::all();

      return response()->json($pizzas);
    }
}
