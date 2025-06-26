export default function Footer() {
    return (
        <footer className="bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 text-center text-sm py-4 text-gray-500">
            © {new Date().getFullYear()} - Todos los derechos reservados.
        </footer>
    );
}
