export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `flex items-center justify-center px-6 py-3 min-w-[150px] text-sm font-medium text-white rounded-lg bg-blue-600 hover:bg-blue-500 transition duration-150 ease-in-out ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
