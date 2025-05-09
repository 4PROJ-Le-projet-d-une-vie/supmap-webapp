import MapView, {type Point} from "./MapView.tsx";
import icons from "./icons.ts";
import type {Incident} from "../../utils/types.ts";
import L from "leaflet";

export default function InteractiveMap(
    {
        incidents,
        setIncidents,
        fetchIncidents,
    }:
    {
        incidents: Incident[]
        setIncidents: (incidents: Incident[]) => void
        fetchIncidents: (point: Point, radius: number) => Promise<Incident[]>
    }) {

    const handleClick = async (p: Point) => {
        console.log(p)
    }

    // const timeoutRef = useRef<number | null>(null)
    // const latestBounds = useRef<{ center: Point, radius: number} | null>(null)

    const handleBoundsChange = async (bounds: L.LatLngBounds, zoom: number) => {
        if (zoom >= 11) {
            const center: Point = {
                latitude: bounds.getCenter().lat,
                longitude: bounds.getCenter().lng,
            }
            const radius = Math.floor((bounds.getSouthWest().distanceTo(bounds.getNorthEast()) / 2) * 1.6)

            const data = await fetchIncidents(center, radius)
            setIncidents(data)

            // Delay to not spam requests to backend don't works correctly
            // latestBounds.current = { center, radius }
            //
            // if (timeoutRef.current !== null) {
            //     clearTimeout(timeoutRef.current)
            // }
            //
            // timeoutRef.current = setTimeout(async () => {
            //     if (latestBounds.current) {
            //         const { center, radius } = latestBounds.current
            //         const data = await fetchIncidents(center, radius)
            //         setIncidents(data)
            //     }
            //     timeoutRef.current = null
            // }, 1000)
        } else {
            setIncidents([])
        }
    }

    // Charger les incidents V
    // Bouton toggle pour afficher / cacher les incidents
    // Placer des points
    // -> A partir de deux points, demander au back de générer une polyline

    return (
        <div className="w-screen h-screen">
            <MapView
                center={{ latitude: 49.1833, longitude: -0.35 }}
                zoom={13}
                points={incidents.map(i => ({
                    id: i.id,
                    point: {latitude: i.lat, longitude: i.lon},
                    icon: icons.typesMap[i.type.id]
                }))}
                onMapClick={handleClick}
                onBoundsChange={handleBoundsChange}
            />
        </div>
    )
}