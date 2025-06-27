import { useState } from 'react';
import { ChevronDown, Home, Calendar, UserCircle, ClipboardList, Sparkles } from 'lucide-react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, usePage } from '@inertiajs/react';



export default function Sidebar({ collapsed }) {
    const { url } = usePage();

    const isActive = (path) => url.startsWith(path);

    // Detectar submenús abiertos en función del path actual
    const getInitialOpenMenu = () => {
        if (isActive('/ecommerce') || isActive('/analytics') || isActive('/marketing') || isActive('/stocks') || isActive('/saas')) {
            return 'crm';
        }
        if (isActive('/task-list') || isActive('/task-kanban')) {
            return 'task';
        }
        return null;
    };

    const [openMenu, setOpenMenu] = useState(getInitialOpenMenu);

    const toggleMenu = (menu) => {
        setOpenMenu(prev => (prev === menu ? null : menu));
    };

    return (
        <aside className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700
          text-gray-900 dark:text-stone-50 h-screen transition-all duration-300 ease-in-out border-r z-[60] -translate-x-full lg:translate-x-0
           ${collapsed ? 'w-[90px]' : 'w-[290px]'} hover:w-[290px] px-5 mt-16 lg:mt-0`}>

            {/* Logo */}
            <div className="py-8 flex items-center gap-2">
                <Link href="/" className="flex items-center gap-2">
                    <ApplicationLogo className="block h-9 w-auto fill-current " />
                    <span className={`text-lg font-semibold transition-all duration-200
                        ${collapsed ? 'opacity-0 invisible group-hover:opacity-100 group-hover:visible' : ''}`}>
                        Laravel
                    </span>
                </Link>
            </div>

            {/* Navigation */}
            <div className="flex flex-col overflow-y-auto no-scrollbar">
                <nav className="mb-6">
                    <div className="flex flex-col gap-4">
                        <div>
                            <h2 className="mb-4 text-xs uppercase text-gray-400">Menu</h2>
                            <ul className="flex flex-col gap-4">

                                {/* Home */}
                                <li>
                                    <Link href="/dashboard" className={`menu-item group flex items-center gap-3 hover:bg-blue-500 px-3 py-2.5 rounded-lg ${url.startsWith('/dashboard') ? 'bg-blue-600 text-white' : ''}`}>
                                        <Home className="w-5 h-5" />
                                        {!collapsed && (
                                            <div>
                                                <span>Inicio</span>
                                            </div>
                                        )}
                                    </Link>
                                </li>

                                {/* CRM Dropdown */}
                                <li>
                                    <button
                                        onClick={() => toggleMenu('crm')}
                                        className="menu-item group flex w-full items-center gap-3 transition-colors hover:bg-blue-500 px-3 py-2.5 rounded-lg"
                                    >
                                        <Sparkles className="w-5 h-5" />
                                        {!collapsed && (
                                            <div className="flex flex-1 items-center">
                                                <span className="flex-1 text-left">CRM</span>
                                                <ChevronDown className={`transition-transform ${openMenu === 'crm' ? 'rotate-180' : ''}`} />
                                            </div>
                                        )}
                                    </button>
                                    {!collapsed && (
                                        <div>
                                            <ul
                                                className={`ml-8 mt-2 flex flex-col space-y-1 overflow-hidden transition-all duration-300 ${openMenu === 'crm' ? 'max-h-[500px]' : 'max-h-0'
                                                    }`}
                                            >
                                                <li>
                                                    <Link href="/ecommerce" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium  hover:bg-blue-500 ${url.startsWith('/ecommerce') ? 'bg-blue-600 text-white' : ''}`}>Ecommerce</Link>
                                                </li>
                                                <li>
                                                    <Link href="/analytics" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 ${url.startsWith('/analytics') ? 'bg-blue-600 text-white' : ''}`}>Analytics</Link>
                                                </li>
                                                <li>
                                                    <Link href="/marketing" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 ${url.startsWith('/marketing') ? 'bg-blue-600 text-white' : ''}`}>Marketing</Link>
                                                </li>
                                                <li>
                                                    <Link href="/stocks" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 ${url.startsWith('/stocks') ? 'bg-blue-600 text-white' : ''}`}>Stocks</Link>
                                                </li>
                                                <li>
                                                    <Link href="/saas" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 ${url.startsWith('/saas') ? 'bg-blue-600 text-white' : ''}`}>SaaS</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>

                                {/* Calendar */}
                                <Link
                                    href="/calendar"
                                    className={`menu-item group flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-blue-500 ${url.startsWith('/calendar') ? 'bg-blue-600 text-white' : ''
                                        }`}
                                >
                                    <Calendar className="w-5 h-5" />
                                    {!collapsed && <span>Calendar</span>}
                                </Link>

                                {/* User Profile */}
                                <li>
                                    <a href="/profile" className={`menu-item group flex items-center gap-3 hover:bg-blue-500 px-3 py-2.5 rounded-lg ${url.startsWith('/profile') ? 'bg-blue-600 text-white' : ''}`}>
                                        <UserCircle className="w-5 h-5" />
                                        {!collapsed && (
                                            <div>
                                                <span>Perfil de usuario</span>
                                            </div>
                                        )}
                                    </a>
                                </li>

                                {/* Task Dropdown */}
                                <li>
                                    <button
                                        onClick={() => toggleMenu('task')}
                                        className="menu-item group flex w-full items-center gap-3 transition-colors hover:bg-blue-500 px-3 py-2.5 rounded-lg"
                                    >
                                        <ClipboardList className="w-5 h-5" />
                                        {!collapsed && (
                                            <div className="flex flex-1 items-center">
                                                <span className="flex-1 text-left">Task</span>
                                                <ChevronDown className={`transition-transform ${openMenu === 'task' ? 'rotate-180' : ''}`} />
                                            </div>
                                        )}
                                    </button>
                                    {!collapsed && (
                                        <div>
                                            <ul
                                                className={`ml-8 mt-2 flex flex-col space-y-1 overflow-hidden transition-all duration-300 ${openMenu === 'task' ? 'max-h-[500px]' : 'max-h-0'
                                                    }`}
                                            >
                                                <li>
                                                    <Link href="/task-list" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 ${url.startsWith('/task-list') ? 'bg-blue-600 text-white' : ''}`}>List</Link>
                                                </li>
                                                <li>
                                                    <Link href="/task-kanban" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 ${url.startsWith('/task-kanban') ? 'bg-blue-600 text-white' : ''}`}>Kanban</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                {/* Banner final */}
                {!collapsed && (
                    <div className="mx-auto mb-10 w-full max-w-60 rounded-2xl bg-gray-50 px-4 py-5 text-center dark:bg-white/[0.03]">
                        <h3 className="mb-2 font-semibold text-gray-900 dark:text-white">
                            #1 Tailwind CSS Dashboard
                        </h3>
                        <p className="mb-4 text-gray-500 text-sm dark:text-gray-400">
                            Leading Tailwind CSS Admin Template with 400+ UI Component and Pages.
                        </p>
                        <a
                            href="https://tailadmin.com/pricing"
                            target="_blank"
                            rel="nofollow"
                            className="flex items-center justify-center p-3 font-medium text-white rounded-lg bg-brand-500 text-sm bg-blue-600 hover:bg-blue-500"
                        >
                            Purchase Plan
                        </a>
                    </div>
                )}
            </div>
        </aside>
    );
}
