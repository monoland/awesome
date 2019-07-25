<?php

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Laravel\Passport\ClientRepository;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name' => 'development',
            'email' => 'dev@monoland.loc',
            'password' => Hash::make('rahasia'),
            'authent_id' => 1
        ]);

        (new ClientRepository)->createPasswordGrantClient(null, 'development', null);
    }
}
