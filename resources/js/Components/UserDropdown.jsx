import { useRef, useState, useEffect } from 'react';
import { ChevronDown, User, Settings, LifeBuoy, LogOut } from 'lucide-react';
import { Link, usePage } from '@inertiajs/react';
import { Transition } from '@headlessui/react';

const UserDropdown = () => {
    const { auth } = usePage().props;
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center text-gray-700 dark:text-gray-300"
            >
                <span className="mr-2 overflow-hidden rounded-full h-10 w-10">
                    <img
                        src={auth.user.avatar || ''}
                        alt="User Avatar"
                        className="object-cover h-full w-full"
                    />
                </span>
                <span className="mr-1 font-medium text-sm">{auth.user.name}</span>
                <ChevronDown className="w-4 h-4 stroke-gray-500 dark:stroke-gray-400" />
            </button>

            <Transition
                show={open}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
            >
                <div className="absolute z-40 right-0 mt-[17px] w-[260px] rounded-2xl border  bg-white p-3 shadow-theme-lg border-gray-300 dark:border-gray-700 dark:bg-gray-900">
                    <div>
                        <span className="block font-medium text-gray-700 text-sm dark:text-gray-300">{auth.user.name}</span>
                        <span className="mt-0.5 block text-xs text-gray-500 dark:text-gray-400">{auth.user.email}</span>
                    </div>
                    <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-300 dark:border-gray-700">
                        <li>
                            <Link href={route('profile.edit')} className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg dark:text-gray-300 hover:bg-blue-500">
                                <User className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                Perfil
                            </Link>
                        </li>
                        <li>
                            <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg  dark:text-gray-300 hover:bg-blue-500">
                                <Settings className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                Configuración
                            </a>
                        </li>
                        <li>
                            <a href="/support" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg  dark:text-gray-300 hover:bg-blue-500">
                                <LifeBuoy className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                                Soporte
                            </a>
                        </li>
                    </ul>
                    <Link method="post" href={route('logout')} as="button" className="flex items-center gap-3 px-3 py-2 mt-3 text-sm font-medium text-gray-700 rounded-lg dark:text-gray-300 hover:bg-blue-500 w-full">
                        <LogOut className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                        Cerrar sesión
                    </Link>
                </div>
            </Transition>
        </div>
    );
};

export default UserDropdown;
