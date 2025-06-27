export default function DangerButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex items-center justify-center px-6 py-3 min-w-[150px] text-sm font-medium text-white rounded-lg bg-red-600 hover:bg-red-500 transition duration-150 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
