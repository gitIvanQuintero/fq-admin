import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Index({ roles }) {
    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Roles</h2>}
        >
            <Head title="Roles" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Contenedor principal */}
                    <div className="p-4 shadow sm:rounded-lg sm:p-8 bg-white dark:bg-white/[0.03] dark:text-stone-50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-medium">Listado de roles</h3>
                            <Link
                                href="/admin/roles/create"
                                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-semibold hover:bg-blue-700 transition"
                            >
                                Crear nuevo rol
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                                        <th className="px-4 py-2 font-semibold">Nombre</th>
                                        <th className="px-4 py-2 font-semibold">Permisos</th>
                                        <th className="px-4 py-2 font-semibold">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roles.map(role => (
                                        <tr key={role.id} className="border-t border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-2">{role.name}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                                {role.permissions.length > 0
                                                    ? role.permissions.map(p => p.name).join(', ')
                                                    : <span className="italic text-gray-400">Sin permisos</span>}
                                            </td>
                                            <td className="px-4 py-2">
                                                <Link
                                                    href={`/admin/roles/${role.id}/edit`}
                                                    className="text-blue-500 hover:underline mr-4"
                                                >
                                                    Editar
                                                </Link>
                                                <Link
                                                    as="button"
                                                    method="delete"
                                                    href={`/admin/roles/${role.id}`}
                                                    className="text-red-500 hover:underline"
                                                >
                                                    Eliminar
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
