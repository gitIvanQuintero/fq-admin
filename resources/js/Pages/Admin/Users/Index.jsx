import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import PrimaryButton from '@/Components/PrimaryButton';
import CreateUserModal from './Components/CreateUserModal';
import EditUserModal from './Components/EditUserModal';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import withReactContent from 'sweetalert2-react-content';

export default function Index({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.users.index'), { search }, { preserveState: true });
    };


    const MySwal = withReactContent(Swal);

    const handleInactivate = (user) => {
        MySwal.fire({
            title: `¿Inactivar a ${user.name}?`,
            text: 'Este usuario no podrá acceder hasta que lo actives de nuevo.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, inactivar',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#dc2626', // rojo
            cancelButtonColor: '#6b7280',  // gris
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('admin.users.deactivate', user.id), {}, {
                    onSuccess: () => toast.success('Usuario inactivado'),
                    onError: () => toast.error('No se pudo inactivar el usuario'),
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={<h2 className="text-xl font-semibold leading-tight">Usuarios</h2>}
        >
            <Head title="Usuarios" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Contenedor principal */}
                    <div className="p-4 shadow sm:rounded-lg sm:p-8 bg-white dark:bg-white/[0.03] dark:text-stone-50">
                        {/* Título arriba */}
                        <h3 className="text-lg font-medium mb-4">Listado de usuarios</h3>

                        {/* Barra de búsqueda + botón en la misma línea */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
                            {/* Barra de búsqueda */}
                            <form onSubmit={handleSearch} className="flex items-center gap-2 w-full sm:max-w-md">
                                <div className="relative flex-grow">
                                    {/* Icono de lupa */}
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                                        </svg>
                                    </span>

                                    {/* Input de búsqueda */}
                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        placeholder="Buscar por nombre o email..."
                                        className="h-10 w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-10 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/40"
                                    />

                                    {/* Botón X para limpiar */}
                                    {search && (
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setSearch('');
                                                router.get(route('admin.users.index'), {}, { preserveState: true });
                                            }}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 dark:text-gray-300 dark:hover:text-red-400"
                                            title="Limpiar búsqueda"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    )}
                                </div>

                                {/* Botón Buscar con mismo estilo que PrimaryButton */}
                                <PrimaryButton type="submit">
                                    Buscar
                                </PrimaryButton>
                            </form>

                            {/* Botón Crear */}
                            <PrimaryButton onClick={() => setShowModal(true)}>
                                Crear nuevo usuario
                            </PrimaryButton>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200">
                                        <th className="px-4 py-2 font-semibold">Nombre</th>
                                        <th className="px-4 py-2 font-semibold">Email</th>
                                        <th className="px-4 py-2 font-semibold">Rol(es)</th>
                                        <th className="px-4 py-2 font-semibold">Estado</th>
                                        <th className="px-4 py-2 font-semibold">Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map(user => (
                                        <tr key={user.id} className="border-t border-gray-200 dark:border-gray-700">
                                            <td className="px-4 py-2">{user.name}</td>
                                            <td className="px-4 py-2">{user.email}</td>
                                            <td className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300">
                                                {user.roles.length > 0
                                                    ? user.roles.map(r => r.name).join(', ')
                                                    : <span className="italic text-gray-400">Sin rol</span>}
                                            </td>
                                            <td className="px-4 py-2">
                                                {user.is_active
                                                    ? <span className="text-green-600 font-medium">Activo</span>
                                                    : <span className="text-gray-500 italic">Inactivo</span>}
                                            </td>
                                            <td className="px-4 py-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setShowEditModal(true);
                                                    }}
                                                    className="text-blue-500 hover:underline mr-4"
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => handleInactivate(user)}
                                                    className="text-yellow-600 hover:underline"
                                                >
                                                    Inactivar
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Paginación */}
                        <div className="mt-4 flex gap-1 justify-center">
                            {users.links.map((link, index) => {
                                let label = link.label;

                                // Traducir los textos de "Previous" y "Next"
                                if (label.includes('Previous')) label = 'Anterior';
                                if (label.includes('Next')) label = 'Siguiente';

                                return (
                                    <Link
                                        key={index}
                                        href={link.url ?? '#'}
                                        className={`px-3 py-1 rounded text-sm ${link.active
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                            } ${!link.url ? 'pointer-events-none opacity-50' : ''}`}
                                        dangerouslySetInnerHTML={{ __html: label }}
                                    />
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
            <CreateUserModal show={showModal} onClose={() => setShowModal(false)} />
            <EditUserModal show={showEditModal} onClose={() => setShowEditModal(false)} user={selectedUser} />
        </AuthenticatedLayout>

    );
}
