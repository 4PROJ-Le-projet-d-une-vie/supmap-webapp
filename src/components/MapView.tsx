import {MapContainer, Marker, Polyline, TileLayer, useMapEvents} from "react-leaflet";
import type {LatLngExpression} from "leaflet";

type Point = { lat: number, lon: number }
type MapProps = {
    center?: Point,
    zoom?: number,
    points?: Point[],
    path?: Point[],
    onMapClick?: (point: Point) => void,
}

const ClickHandler = ({ onMapClick }: { onMapClick?: (point: Point) => void }) => {
    useMapEvents({
        click(e) {
            if (onMapClick) {
                const { lat, lng } = e.latlng
                onMapClick({ lat, lon: lng })
            }
        },
    })
    return null
}

export default function MapView({
    center = { lat: 49.1833, lon: -0.35 },
    zoom = 13,
    points = [],
    path = [],
    onMapClick,
}: MapProps) {
    const leafletCenter: LatLngExpression = [center?.lat, center?.lon]

    return (
        <MapContainer center={leafletCenter} zoom={zoom} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {points?.map((point, i) => (
                <Marker key={i} position={[point.lat, point.lon]}/>
            ))}
            {path?.length > 1 && (
                <Polyline positions={path?.map(point => [point.lat, point.lon] as LatLngExpression)}/>
            )}
            <ClickHandler onMapClick={onMapClick}/>
        </MapContainer>
    )
}

