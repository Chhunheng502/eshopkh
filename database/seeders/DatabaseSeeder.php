<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();

        // for($i = 0; $i < 10; $i++)
        // {
        //     DB::table('product_collection')->insert([
        //         'collection_id' => 1,
        //         'product_id' => 10 + $i*7,
        //         'created_at' => date('Y-m-d H:i:s'),
        //         'updated_at' => date('Y-m-d H:i:s')
        //     ]);
        // }

        // DB::table('collections')->insert([
        //     'name' => "January's Best Collection",
        //     'image' => 'https://images.pexels.com/photos/7130469/pexels-photo-7130469.jpeg?cs=srgb&dl=pexels-gradienta-7130469.jpg&fm=jpg',
        //     'created_at' => date('Y-m-d H:i:s'),
        //     'updated_at' => date('Y-m-d H:i:s')
        // ]);

        DB::table('admins')->insert([
            'name' => "eShopKH",
            'password' => Hash::make('123456789'),
            'created_at' => date('Y-m-d H:i:s'),
            'updated_at' => date('Y-m-d H:i:s')
        ]);
    }
}
