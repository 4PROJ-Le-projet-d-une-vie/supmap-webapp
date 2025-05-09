import MapView, {type PointDisplay} from "./MapView.tsx";
import icons from "./icons.ts";
import type {GISPoint, Incident, Point, Trip} from "../../utils/types.ts";
import L from "leaflet";
import InteractionPopup from "./InteractionPopup.tsx";

export default function InteractiveMap(
    {
        incidents,
        setIncidents,
        fetchIncidents,

        userPoints,
        setUserPoints,
        shapes,
        setShapes,
        fetchGis
    }:
    {
        incidents: Incident[]
        setIncidents: (incidents: Incident[]) => void
        fetchIncidents: (point: Point, radius: number) => Promise<Incident[]>

        userPoints: Point[]
        setUserPoints: (points: Point[]) => void
        shapes: Point[]
        setShapes: (points: Point[]) => void
        fetchGis: (points: GISPoint[]) => Promise<Trip[]>
    }) {

    const handleClick = async (p: Point) => {
        const updatedPoints = [...userPoints, p]

        if (updatedPoints.length > 1) {
            try {
                const res = await fetchGis(updatedPoints.map(p => ({
                    lat: p.latitude,
                    lon: p.longitude,
                })))
                const polyline = res.flatMap(trip => trip.legs.flatMap(leg => leg.shape))
                setShapes(polyline)
            } catch (err) {
                return
            }
        }
        setUserPoints(updatedPoints)
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
    // Placer des points V
    // -> A partir de deux points, demander au back de générer une polyline V
    // -> Marker départ en vert, arrivée en rouge et intermédiaire en bleue V

    const incidentsPointsDisplay: PointDisplay[] = incidents.map(i => ({
        id: i.id,
        point: {latitude: i.lat, longitude: i.lon},
        icon: icons.typesMap[i.type.id],
        popupContent: <InteractionPopup incident={i} />
    }))

    const userPointsDisplay: PointDisplay[] = userPoints.map((point, i) => {

        const isFirst = i === 0
        const isLast = i === userPoints.length - 1

        const icon = isFirst
            ? icons.startIcon
            : isLast
                ? icons.finishIcon
                : icons.pointIcon

        return {
            id: 10_000 + i,
            point: {
                latitude: point.latitude,
                longitude:
                point.longitude,
            },
            icon: icon
        }
    })

    const points = new Map<number, PointDisplay>

    for (const point of incidentsPointsDisplay) {
        points.set(point.id, point)
    }

    for (const point of userPointsDisplay) {
        if (!points.has(point.id)) {
            points.set(point.id, point)
        }
    }

    return (
        <div className="w-screen h-screen">
            <MapView
                center={{ latitude: 49.1833, longitude: -0.35 }}
                zoom={13}
                points={Array.from(points.values())}
                onMapClick={handleClick}
                onBoundsChange={handleBoundsChange}
                path={shapes}
            />
        </div>
    )
}