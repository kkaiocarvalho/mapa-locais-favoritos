import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { usePlacesUI } from "@/context/PlacesUIContext";

type LatLngTuple = [number, number];

function ClickHandler() {
  const { selectPosition } = usePlacesUI();

  useMapEvents({
    click(e) {
      selectPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}

function Recenter({ selected, zoom = 15 }: { selected: LatLngTuple | null; zoom?: number }) {
  const map = useMap();

  useEffect(() => {
    if (!selected) return;
    map.setView(selected, zoom, { animate: true });
  }, [selected, zoom, map]);

  return null;
}

export default function MapView() {
  const center: LatLngTuple = [-18.9167, -48.2833];
  const { selected } = usePlacesUI();

  return (
    <div className="h-full w-full">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler />
        <Recenter selected={selected} zoom={15} />

        {selected && (
          <Marker position={selected}>
            <Popup>
              Lat: {selected[0].toFixed(6)}
              <br />
              Lng: {selected[1].toFixed(6)}
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
