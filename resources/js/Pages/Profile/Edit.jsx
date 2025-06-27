import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight">
                    Perfil
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-4">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    {/* Dos formularios en línea */}
                    <div className="flex flex-col gap-6 lg:flex-row">
                        <div className="flex-1 p-4 shadow sm:rounded-lg sm:p-8 bg-white dark:bg-white/[0.03] dark:text-stone-50">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>

                        <div className="flex-1 p-4 shadow sm:rounded-lg sm:p-8 bg-white dark:bg-white/[0.03] dark:text-stone-50">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Formulario abajo, en todo el ancho */}
                    <div className="p-4 shadow sm:rounded-lg sm:p-8 bg-white dark:bg-white/[0.03] dark:text-stone-50">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
