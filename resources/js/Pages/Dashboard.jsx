import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Inicio
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="mb-10 w-full rounded-2xl bg-white px-4 py-5 dark:bg-white/[0.03] mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                    Dashboard Page Title
                </h3>
                <p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
                    Dashboard Page Description
                </p>

            </div>
        </AuthenticatedLayout>
    );
}
