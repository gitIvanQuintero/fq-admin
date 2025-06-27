import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function ErrorPage({ status }) {
    const { auth } = usePage().props;

    const titles = {
        403: 'Acceso denegado',
        404: 'Página no encontrada',
        500: 'Error del servidor',
    };

    const messages = {
        403: 'No tienes permisos para acceder a esta sección.',
        404: 'La página que buscas no existe.',
        500: 'Algo salió mal en el servidor. Intenta más tarde.',
    };

    const title = titles[status] || 'Error';
    const message = messages[status] || 'Ha ocurrido un error inesperado.';

    const content = (
        <>
            <Head title={`${status} - ${title}`} />
            <div className="max-w-4xl mx-auto mt-20 bg-white dark:bg-white/[0.03] p-8 rounded-2xl shadow">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">{status} – {title}</h1>
                <p className="text-gray-600 dark:text-gray-400 text-lg">{message}</p>
            </div>
        </>
    );

    return auth?.user ? (
        <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight">{title}</h2>}>
            {content}
        </AuthenticatedLayout>
    ) : (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
            {content}
        </div>
    );
}
