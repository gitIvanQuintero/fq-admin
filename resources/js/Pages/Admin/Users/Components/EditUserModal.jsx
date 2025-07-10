import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

export default function EditUserModal({ show, onClose, user }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: '',
        email: '',
    });

    useEffect(() => {
        if (show && user) {
            setData({
                name: user.name,
                email: user.email,
            });
        }
    }, [show, user]);

    const handleSubmit = (e) => {
        e.preventDefault();

        put(route('admin.users.update', user.id), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <Modal show={show} onClose={onClose}>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    Editar usuario
                </h2>

                <div>
                    <InputLabel htmlFor="name" value="Nombre" />
                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.name} className="mt-1" />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="mt-1 block w-full"
                        required
                    />
                    <InputError message={errors.email} className="mt-1" />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                    <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
                    <PrimaryButton disabled={processing}>Actualizar</PrimaryButton>
                </div>
            </form>
        </Modal>
    );
}
