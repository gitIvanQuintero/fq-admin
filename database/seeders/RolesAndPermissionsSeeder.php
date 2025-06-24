<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

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
        $admin = Role::firstOrCreate(['name' => 'Super administrador']);
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

        // Crear usuarios
        $users = [
            [
                'name' => 'Admin User',
                'email' => 'super_admin@fq.com',
                'password' => 'Admin789456',
                'role' => 'Super administrador',
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
    }
}
