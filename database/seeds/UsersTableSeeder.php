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
        $user = User::create([
            'name' => 'administrator',
            'email' => 'admin@monoland.loc',
            'password' => Hash::make('rahasia'),
            'authent' => 'superadmin'
        ]);

        dd(((new ClientRepository())->createPasswordGrantClient(null, 'monoland-ui', null))->secret);
    }
}
