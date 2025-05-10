import icon from '../assets/icon.png';

export default function Navbar() {
    return (
        <div className="w-full h-20 bg-gradient-to-r from-[#57458A] to-[#7a68b0] text-white flex items-center justify-between px-8 shadow-md">
            <div className="flex items-center gap-3">
                {/* Image 64x64 centrée */}
                <img src={icon} alt="Logo" className="w-16 h-16 object-contain" />
                <h1 className="text-2xl font-bold tracking-tight">Supmap</h1>
            </div>
        </div>
    )
}