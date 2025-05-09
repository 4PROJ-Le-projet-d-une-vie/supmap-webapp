import {MapContainer, Marker, Polyline, TileLayer, useMapEvents} from "react-leaflet";
import type {LatLngExpression} from "leaflet";

type Point = { latitude: number, longitude: number }
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
                onMapClick({ latitude: lat, longitude: lng })
            }
        },
    })
    return null
}

export default function MapView({
    center = { latitude: 49.1833, longitude: -0.35 },
    zoom = 13,
    points = [],
    path = [],
    onMapClick,
}: MapProps) {
    const leafletCenter: LatLngExpression = [center?.latitude, center?.longitude]

    return (
        <MapContainer center={leafletCenter} zoom={zoom} style={{height: '100%', width: '100%'}}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
            {points?.map((point, i) => (
                <Marker key={i} position={[point.latitude, point.longitude]}/>
            ))}
            {path?.length > 1 && (
                <Polyline positions={path?.map(point => [point.latitude, point.longitude] as LatLngExpression)}/>
            )}
            <ClickHandler onMapClick={onMapClick}/>
        </MapContainer>
    )
}

