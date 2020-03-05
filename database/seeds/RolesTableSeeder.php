<?php

use App\Models\Role;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $superadmin = Role::create([
            'name' => 'Superadmin',
            'slug' => Str::slug('superadmin')
        ]);

        $superadmin->assignModule(
            'moui-home',
            'moui-module',
            'moui-permission',
            'moui-role',
            'moui-account',
            'moui-client',
            'moui-setting',
            'moui-password',
            'moui-profile',
            'moui-notification'
        );

        $superadmin->assignPermission(
            '*-moui-home',
            '*-moui-module',
            '*-moui-permission',
            '*-moui-role',
            '*-moui-account',
            '*-moui-client',
            '*-moui-setting',
            '*-moui-password',
            '*-moui-profile',
            '*-moui-notification'
        );
    }
}
