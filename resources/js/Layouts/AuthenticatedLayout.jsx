import { useState } from 'react';
import Sidebar from '@/Components/Sidebar';
import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';

export default function AuthenticatedLayout({ header, children }) {
    const [collapsed, setCollapsed] = useState(false);
    const [hovering, setHovering] = useState(false);
    const [manualToggle, setManualToggle] = useState(true);

    const toggleSidebar = () => {
        // Si estaba abierto y lo cierran, vuelve al modo automático (hover)
        setCollapsed(prev => {
            const next = !prev;
            setManualToggle(!next); // solo mantener manual si está abierto
            return next;
        });
    };

    // Calcula colapso real: si el usuario no ha tocado el toggle, usa hover
    const actualCollapsed = manualToggle ? collapsed : !hovering;

    return (
        <div className="min-h-screen bg-gray-100 flex">
            <div
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
            >
                <Sidebar collapsed={actualCollapsed} />
            </div>

            <div className={`flex-1 flex flex-col transition-all duration-300 ${actualCollapsed ? 'lg:ml-20' : 'lg:ml-72'}`}>
                <Navbar toggleSidebar={toggleSidebar} />
                {header && (
                    <header className="bg-white shadow">
                        <div className="px-4 py-6 sm:px-6 lg:px-8  bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-stone-50 ">
                            {header}
                        </div>
                    </header>
                )}
                <main className="p-4 flex-1 bg-gray-50  dark:bg-gray-900">{children}</main>
                <Footer />
            </div>
        </div>
    );
}
