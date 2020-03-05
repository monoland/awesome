<?php

use App\Models\Module;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class ModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        /**
         * home
         */
        $home = Module::create([
            'name' => 'Home',
            'slug' => 'moui-home',
            'icon' => 'home',
            'maps' => null,
            'menu' => true,
            'path' => 'dashboard',
            'apps' => 'moui'
        ]);

        $home->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-home']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-home']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-home']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-home']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-home']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-home']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-home']),
        ]);

        /**
         * module
         */
        $module = Module::create([
            'name' => 'Module',
            'slug' => 'moui-module',
            'icon' => 'assignment',
            'maps' => 'master',
            'menu' => true,
            'path' => 'module',
            'apps' => 'moui'
        ]);

        $module->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-module']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-module']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-module']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-module']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-module']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-module']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-module']),
        ]);

        /**
         * permission
         */
        $permission = Module::create([
            'name' => 'Permission',
            'slug' => 'moui-permission',
            'icon' => 'policy',
            'maps' => null,
            'menu' => false,
            'path' => 'module/:module/permission',
            'apps' => 'moui'
        ], $module);

        $permission->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-permission']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-permission']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-permission']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-permission']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-permission']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-permission']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-permission']),
        ]);

        /**
         * role
         */
        $role = Module::create([
            'name' => 'Role',
            'slug' => 'moui-role',
            'icon' => 'offline_bolt',
            'maps' => 'master',
            'menu' => true,
            'path' => 'role',
            'apps' => 'moui'
        ]);

        $role->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-role']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-role']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-role']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-role']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-role']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-role']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-role']),
        ]);

        /**
         * account
         */
        $account = Module::create([
            'name' => 'Account',
            'slug' => 'moui-account',
            'icon' => 'supervisor_account',
            'maps' => 'utility',
            'menu' => true,
            'path' => 'account',
            'apps' => 'moui'
        ]);

        $account->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-account']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-account']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-account']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-account']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-account']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-account']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-account']),
        ]);

        /**
         * oauth
         */
        $oauth = Module::create([
            'name' => 'OAuth',
            'slug' => 'moui-client',
            'icon' => 'nfc',
            'maps' => 'utility',
            'menu' => true,
            'path' => 'client',
            'apps' => 'moui'
        ]);

        $oauth->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-client']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-client']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-client']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-client']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-client']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-client']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-client']),
        ]);

        /**
         * setting
         */
        $setting = Module::create([
            'name' => 'Setting',
            'slug' => 'moui-setting',
            'icon' => 'settings',
            'maps' => 'utility',
            'menu' => true,
            'path' => 'setting',
            'apps' => 'moui'
        ]);

        $setting->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-setting']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-setting']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-setting']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-setting']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-setting']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-setting']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-setting']),
        ]);

        /**
         * password
         */
        $password = Module::create([
            'name' => 'Password',
            'slug' => 'moui-password',
            'icon' => 'lock',
            'maps' => null,
            'menu' => false,
            'path' => 'password',
            'apps' => 'moui'
        ]);

        $password->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-password']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-password']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-password']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-password']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-password']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-password']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-password']),
        ]);

        /**
         * profile
         */
        $profile = Module::create([
            'name' => 'Profile',
            'slug' => 'moui-profile',
            'icon' => 'perm_identity',
            'maps' => null,
            'menu' => false,
            'path' => 'profile',
            'apps' => 'moui'
        ]);

        $profile->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-profile']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-profile']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-profile']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-profile']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-profile']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-profile']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-profile']),
        ]);

        /**
         * notification
         */
        $notification = Module::create([
            'name' => 'Notification',
            'slug' => 'moui-notification',
            'icon' => 'assignment',
            'maps' => null,
            'menu' => false,
            'path' => 'notification',
            'apps' => 'moui'
        ]);

        $notification->permissions()->saveMany([
            new Permission(['name' => 'view', 'slug' => 'view-moui-notification']),
            new Permission(['name' => 'viewAny', 'slug' => 'view-any-moui-notification']),
            new Permission(['name' => 'create', 'slug' => 'create-moui-notification']),
            new Permission(['name' => 'update', 'slug' => 'update-moui-notification']),
            new Permission(['name' => 'delete', 'slug' => 'delete-moui-notification']),
            new Permission(['name' => 'restore', 'slug' => 'restore-moui-notification']),
            new Permission(['name' => 'forceDelete', 'slug' => 'force-delete-moui-notification']),
        ]);
    }
}
