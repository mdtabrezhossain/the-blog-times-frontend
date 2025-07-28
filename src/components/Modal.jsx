export default function Modal({ children }) {
    return (
        <div className="grid place-content-center absolute z-50 inset-0 w-full h-full bg-gray-500/50">
            {children}
        </div>
    )
}
