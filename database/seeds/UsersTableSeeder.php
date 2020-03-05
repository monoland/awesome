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
            'name' => 'superadmin',
            'email' => 'super@super.loc',
            'password' => Hash::make('12345')
        ]);

        $user->assignRole('superadmin');

        var_dump(((new ClientRepository())->createPasswordGrantClient(null, 'moui', null))->secret);
    }
}
