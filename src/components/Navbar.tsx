import {Link} from "react-router-dom";

export default function Navbar() {
    return (
        <div className="w-full h-20 bg-gradient-to-r from-[#57458A] to-[#7a68b0] text-white flex items-center justify-between px-8 shadow-md">
            <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#57458A]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold tracking-tight">Supmap</h1>
            </div>

            <div className="flex items-center gap-4">
                <Link to="/login" className="px-4 py-2 text-sm font-medium hover:text-gray-200 transition-colors">Se connecter</Link>
                <Link to="/register" className="px-5 py-2 text-sm font-medium bg-white text-[#57458A] rounded-lg hover:bg-gray-100 transition-colors shadow-sm">S'inscrire</Link>
            </div>
        </div>
    )
}