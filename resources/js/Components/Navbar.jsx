import { useEffect, useState } from 'react';
import { Bell, Sun, Moon } from 'lucide-react';
import UserDropdown from './UserDropdown';
import { usePage } from '@inertiajs/react';

export default function Navbar({ user, toggleSidebar }) {
    const { auth } = usePage().props;
    const [isDark, setIsDark] = useState(false);

    // Detectar preferencia inicial
    useEffect(() => {
        const root = document.documentElement;
        const storedTheme = localStorage.getItem('theme');

        if (storedTheme === 'dark') {
            root.classList.add('dark');
            setIsDark(true);
        } else if (storedTheme === 'light') {
            root.classList.remove('dark');
            setIsDark(false);
        } else {
            // No hay tema guardado → usar preferencia del sistema
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            root.classList.toggle('dark', prefersDark);
            setIsDark(prefersDark);
        }
    }, []);

    // Cambiar tema manualmente
    const toggleTheme = () => {
        const root = document.documentElement;
        const isNowDark = !isDark;

        root.classList.toggle('dark', isNowDark);
        localStorage.setItem('theme', isNowDark ? 'dark' : 'light');
        setIsDark(isNowDark);
    };

    return (
        <nav className="sticky top-0 z-50 flex w-full bg-white border-gray-300 dark:border-gray-700 dark:bg-gray-900 border-b">
            <div className="flex w-full items-center justify-between px-4 py-4 lg:px-6">
                {/* Left side */}
                <div className="flex items-center gap-3">
                    {/* Sidebar Toggle Button */}
                    <button
                        onClick={toggleSidebar}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border text-gray-500 hover:bg-blue-500 hover:text-gray-700 border-gray-300 dark:border-gray-700 dark:text-gray-300 dark:hover:text-white"
                    >
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                            <path
                                fill="currentColor"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0.583252 1C0.583252 0.585788 0.919038 0.25 1.33325 0.25H14.6666C15.0808 0.25 15.4166 0.585786 15.4166 1C15.4166 1.41421 15.0808 1.75 14.6666 1.75H1.33325C0.919038 1.75 0.583252 1.41422 0.583252 1ZM0.583252 11C0.583252 10.5858 0.919038 10.25 1.33325 10.25H14.6666C15.0808 10.25 15.4166 10.5858 15.4166 11C15.4166 11.4142 15.0808 11.75 14.6666 11.75H1.33325C0.919038 11.75 0.583252 11.4142 0.583252 11ZM1.33325 5.25C0.919038 5.25 0.583252 5.58579 0.583252 6C0.583252 6.41421 0.919038 6.75 1.33325 6.75H7.99992C8.41413 6.75 8.74992 6.41421 8.74992 6C8.74992 5.58579 8.41413 5.25 7.99992 5.25H1.33325Z"
                            />
                        </svg>
                    </button>

                    {/* Search bar (desktop only) */}
                    <div className="hidden lg:block">
                        <form>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    className="h-10 w-64 rounded-lg border bg-transparent py-2 pl-10 pr-4 text-sm text-gray-800 placeholder:text-gray-400 shadow-sm focus:border-brand-300 focus:outline-none focus:ring-2 focus:ring-brand-500/10 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:placeholder:text-white/40"
                                />
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-300">
                                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path d="M21 21l-4.35-4.35M10 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" />
                                    </svg>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {/* Theme toggle button */}
                    <button
                        onClick={toggleTheme}
                        className="flex h-10 w-10 items-center justify-center rounded-full border bg-white text-gray-500 hover:text-gray-700 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-blue-500 dark:hover:text-white dark:hover:bg-blue-500"
                    >
                        {isDark ? <Sun size={18} /> : <Moon size={18} />}
                    </button>
                    <button className="relative flex items-center justify-center w-10 h-10 text-gray-500 border rounded-full bg-white hover:text-gray-700 border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 hover:bg-blue-500 dark:hover:text-white dark:hover:bg-blue-500">
                        <Bell className="w-5 h-5" />
                    </button>
                    <UserDropdown />
                </div>
            </div>
        </nav>
    );
}
