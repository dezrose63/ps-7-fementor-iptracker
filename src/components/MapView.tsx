import { useEffect } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import iconLocation from "../assets/icon-location.svg";

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as unknown)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: iconLocation,
  iconUrl: iconLocation,
  shadowUrl: '',
});

const pin = new L.Icon({
  iconUrl: iconLocation,
  iconSize: [46, 56],
  iconAnchor: [23, 56],
});

type Props = { lat?: number; lng?: number };

// Component to update map center when coordinates change
function ChangeView({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
}

export default function MapView({ lat = 40.7128, lng = -74.006 }: Props) {
  const position: [number, number] = [lat, lng];

  return (
    <div className="h-[600px] w-full">
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom
        style={{ height: "100%", width: "100%" }}
        key={`${lat}-${lng}`} // Force re-render on position change
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} icon={pin} />
        <ChangeView center={position} />
      </MapContainer>
    </div>
  );
}