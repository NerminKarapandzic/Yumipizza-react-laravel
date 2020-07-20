<?php

use Illuminate\Database\Seeder;

class PizzaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('pizzas')->insert([
          'name' => 'Pizza 1',
          'price' => 10,
          'image' => 'images/1.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 2',
          'price' => 12,
          'image' => 'images/2.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 3',
          'price' => 13,
          'image' => 'images/3.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 4',
          'price' => 10,
          'image' => 'images/4.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 5',
          'price' => 8,
          'image' => 'images/5.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 6',
          'price' => 14,
          'image' => 'images/6.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 7',
          'price' => 10,
          'image' => 'images/7.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 8',
          'price' => 11,
          'image' => 'images/8.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 9',
          'price' => 8,
          'image' => 'images/9.png'
        ]);

        DB::table('pizzas')->insert([
          'name' => 'Pizza 10',
          'price' => 12,
          'image' => 'images/10.png'
        ]);
    }
}
