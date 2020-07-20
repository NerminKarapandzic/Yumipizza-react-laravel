<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Darryldecode\Cart\Facades\CartFacade as Cart;
use App\Order;

class CartController extends Controller
{
    public function index(){
      $content = Cart::getContent();
      $count = Cart::getTotalQuantity();
      $total = Cart::getTotal();

      return response()->json([
        'cart' => [
          'items' => $content,
          'count' => $count,
          'total' => $total
        ]
      ]);

    }

    public function add(Request $request) {
        Cart::add(array(
            'id' => $request->id,
            'name' => $request->name,
            'price' => $request->price,
            'quantity' => $request->quantity,
        ));

        $content = Cart::getContent();
        $count = Cart::getTotalQuantity();
        $total = Cart::getTotal();

        if($request->quantity > 1){
          $message = $request->quantity .' items added to cart';
        }else{
          $message = 'Item added to cart';
        }

      return response()->json([
        'message' => $message,
        'cart' => [
          'items' => $content,
          'count' => $count,
          'total' => $total
        ]
      ]);
    }

    public function remove(Request $request) {
        $item = $request->id;

        Cart::remove($item);

        $content = Cart::getContent();
        $count = Cart::getTotalQuantity();
        $total = Cart::getTotal();
        
        return response()->json([
            'message' => 'Item has been removed from the cart.',
            'cart' => [
                'items' => $content,
                'count' => $count,
                'total' => $total
            ]
        ]);
    }

    public function clear(){
        Cart::clear();

        $content = Cart::getContent();
        $count = Cart::getTotalQuantity();
        $total = Cart::getTotal();
        
        return response()->json([
            'message' => 'Item has been removed from the cart.',
            'cart' => [
                'items' => $content,
                'count' => $count,
                'total' => $total
            ]
        ]);

    }

    public function order(Request $request){
        
        $this->validate($request, [
            'name' => 'required|max:20',
            'adress' => 'required|max:20',
            'city' => 'required|max:20',
            'postal' => 'required|max:20',
            'email' => 'required|email'
        ]);

        $items = $request->cart;

        $items = serialize($items);

        $data = [
            'items' => $items,
            'name' => $request->name,
            'adress' => $request->adress,
            'email' => $request->email,
            'city' => $request->city,
            'postal' => $request->postal,
            'count' => $request->cart['count'],
            'total' => $request->cart['total']
        ];

        $order = Order::create($data);

        return response()->json(['message' => 'Your order was sent successfully.']);

    }   
}
