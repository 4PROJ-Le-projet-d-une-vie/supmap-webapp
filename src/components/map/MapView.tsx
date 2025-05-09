import {MapContainer, Marker, Polyline, TileLayer, useMapEvents} from "react-leaflet";
import type {LatLngExpression} from "leaflet";
import L from "leaflet"
import type {Point} from "../../utils/types.ts";

export type PointDisplay = {
    id: number
    point: Point
    icon: L.Icon
}
type HandleClick = (point: Point) => void
type HandleBoundsChanges = (bounds: L.LatLngBounds, zoom: number) => void
type MapProps = {
    center?: Point,
    zoom?: number,
    points?: PointDisplay[],
    path?: Point[],
    onMapClick?: HandleClick
    onBoundsChange?: HandleBoundsChanges
}

const MapEventHandler = ({ onMapClick, onBoundsChange }: { onMapClick?: HandleClick, onBoundsChange?: HandleBoundsChanges }) => {
    useMapEvents({
        click(e) {
            if (onMapClick) {
                const { lat, lng } = e.latlng
                onMapClick({ latitude: lat, longitude: lng })
            }
        },
        moveend(e) {
            const m = e.target as L.Map
            if (onBoundsChange) {
                onBoundsChange(m.getBounds(), m.getZoom())
            }
        },
        zoom(e) {
            const m = e.target as L.Map
            if (onBoundsChange) {
                onBoundsChange(m.getBounds(), m.getZoom())
            }
        }
    })
    return null
}

export default function MapView({
    center = { latitude: 46.331758, longitude: 2.8564453125 },
    zoom = 6,
    points = [],
    path = [],
    onMapClick,
    onBoundsChange
}: MapProps) {
    const leafletCenter: LatLngExpression = [center?.latitude, center?.longitude]

    return (
        <MapContainer center={leafletCenter} zoom={zoom} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {points?.map(point => (
                <Marker
                    key={point.id}
                    position={[point.point.latitude, point.point.longitude]}
                    icon={point.icon}
                />
            ))}
            {path?.length > 1 && (
                <Polyline
                    positions={path?.map(point => [point.latitude, point.longitude] as LatLngExpression)}
                    color="#57458A"
                />
            )}
            <MapEventHandler onMapClick={onMapClick} onBoundsChange={onBoundsChange}/>
        </MapContainer>
    )
}

