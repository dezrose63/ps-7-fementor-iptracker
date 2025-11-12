import { MapContainer, Marker, TileLayer } from "react-leaflet";
import L from "leaflet";

const pin = new L.Icon({
  iconUrl: "/src/assets/icon-location.svg",
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

type Props = { lat?: number; lng?: number };

export default function MapView({ lat = 40.7128, lng = -74.006 }: Props) {
  return (
    <div className="h-[480px] w-full">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={pin} />
      </MapContainer>
    </div>
  );
}