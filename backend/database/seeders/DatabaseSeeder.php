<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Roles
        DB::table('roles')->insertOrIgnore([
            [
                'id'         => 1,
                'name'       => 'Administrador',
                'slug'       => 'admin',
                'description'=> 'Usuario Administrador',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id'         => 2,
                'name'       => 'Cliente',
                'slug'       => 'customer',
                'description'=> 'Usuario cliente de la tienda',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);

        // Admin (para login)
        User::create([
            'role_id'    => 1,
            'first_name' => 'Admin',
            'last_name'  => 'Principal',
            'email'      => 'admin@oxmos.com',
            'password'   => Hash::make('administradorcito321'),
            'is_active'  => true,
            'email_verified_at' => now(),
        ]);

        // Cliente de prueba
        User::create([
            'role_id'    => 2,
            'first_name' => 'Test',
            'last_name'  => 'User',
            'email'      => 'test@example.com',
            'password'   => Hash::make('password'),
            'is_active'  => true,
        ]);
    }
}
