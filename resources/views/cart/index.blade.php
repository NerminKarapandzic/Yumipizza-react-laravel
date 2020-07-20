@extends('layouts.app')

@section('content')
  <div id="app"></div>

  <div class="container mt-4">
    <div class="col-12 col-md-6">
      <h1>Your cart: </h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Item</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          @foreach ($cart['items'] as $item)

          <tr>
            <th>{{$item['name']}}</th>
            <th>{{$item['quantity']}}</th>
            <th>{{$item['price'] * $item['quantity']}}</th>
          </tr>

          @endforeach
        </tbody>
      </table>
    </div>

    <div class="col-12 col-md-6">
      <div id="cart" data={{json_encode($cart)}}>
        <Cart />
      </div>
    </div>
  </div>
@endsection
