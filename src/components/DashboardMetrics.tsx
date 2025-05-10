import type {Incident, Point} from "../utils/types.ts";

type DashboardProps = {
    incidents: Incident[];
    userPoints: Point[];
    shapes: Point[];
    clearRoute: () => void
}

function timeAgo(date: Date): string {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()

    const seconds = Math.floor(diffMs / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (days > 0) return `il y a ${days} jour${days > 1 ? 's' : ''}`
    if (hours > 0) return `il y a ${hours} heure${hours > 1 ? 's' : ''}`
    if (minutes > 0) return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`
    return 'il y a quelques secondes'
}

export default function DashboardMetrics({ incidents, userPoints, shapes, clearRoute }: DashboardProps) {

    const latestIncident = incidents.length > 0
        ? [...incidents].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0]
        : null

    const timeSinceLastIncident = latestIncident
        ? timeAgo(new Date(latestIncident.created_at))
        : 'Aucun incident'

    return (
        <div className="flex flex-col lg:flex-row flex-wrap gap-4 w-full max-h-full overflow-auto">
            {/* Incidents metrics card */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex-grow min-w-[250px] max-w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-red-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    Incidents dans la zone
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                        <p className="text-sm text-gray-500 mb-1">Total</p>
                        <p className="text-2xl font-bold text-[#57458A]">{incidents.length}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                        <p className="text-sm text-gray-500 mb-1">Dernier signalement</p>
                        <p className="text-2xl font-bold text-[#57458A]">{timeSinceLastIncident}</p>
                    </div>
                </div>
            </div>

            {/* Route statistics card */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex-grow min-w-[250px] max-w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    Itinéraire
                </h2>
                <div className="space-y-3">
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                        <p className="text-sm text-gray-500 mb-1">Points définis</p>
                        <p className="text-2xl font-bold text-[#57458A]">{userPoints.length}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                        <p className="text-sm text-gray-500 mb-1">Distance totale</p>
                        <p className="text-2xl font-bold text-[#57458A]">{shapes.length > 0 ? '12.3 km' : '0 km'}</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                        <p className="text-sm text-gray-500 mb-1">Temps estimé</p>
                        <p className="text-2xl font-bold text-[#57458A]">{shapes.length > 0 ? '25 min' : '0 min'}</p>
                    </div>
                </div>
            </div>

            {/* Quick actions */}
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow flex-grow min-w-[250px] max-w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Actions rapides</h2>
                <div className="flex flex-col gap-3">
                    <button
                        className="w-full py-3 px-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-medium shadow-sm"
                        onClick={clearRoute}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Effacer l'itinéraire
                    </button>
                </div>
            </div>
        </div>
    )
}