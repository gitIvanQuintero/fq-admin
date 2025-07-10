<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;
use Faker\Factory as Faker;

class RolesAndPermissionsSeeder extends Seeder
{
    public function run(): void
    {
        // Limpiar caché
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Crear permisos
        $permissions = [
            'view dashboard',
            'edit articles',
            'delete articles',
            'publish articles',
        ];

        foreach ($permissions as $perm) {
            Permission::firstOrCreate(['name' => $perm]);
        }

        // Crear roles
        $admin = Role::firstOrCreate(['name' => 'Super Administrador']);
        $editor = Role::firstOrCreate(['name' => 'Administrador']);
        $viewer = Role::firstOrCreate(['name' => 'Usuario']);

        // Asignar permisos a roles
        $admin->syncPermissions(Permission::all());

        $editor->syncPermissions([
            'view dashboard',
            'edit articles',
            'publish articles',
        ]);

        $viewer->syncPermissions([
            'view dashboard',
        ]);

        // Crear usuarios específicos
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'super_admin@fq.com',
                'password' => 'Admin789456',
                'role' => 'Super Administrador',
            ],
            [
                'name' => 'Editor User',
                'email' => 'admin@fq.com',
                'password' => 'password',
                'role' => 'Administrador',
            ],
            [
                'name' => 'Viewer User',
                'email' => 'user@fq.com',
                'password' => 'password',
                'role' => 'Usuario',
            ],
        ];

        foreach ($users as $data) {
            $user = User::firstOrCreate(
                ['email' => $data['email']],
                [
                    'name' => $data['name'],
                    'password' => Hash::make($data['password']),
                ]
            );

            $user->assignRole($data['role']);
        }

        // Crear 30 usuarios aleatorios con rol 'Usuario'
        $faker = Faker::create();

        for ($i = 1; $i <= 300; $i++) {
            $randomUser = User::create([
                'name' => $faker->name,
                'email' => $faker->unique()->safeEmail,
                'password' => Hash::make('password'), // contraseña por defecto
            ]);

            $randomUser->assignRole('Usuario');
        }
    }
}
