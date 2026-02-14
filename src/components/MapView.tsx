import { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { usePlacesUI } from "@/context/PlacesUIContext";
import { useSavedPlaces } from "@/hooks/useSavedPlaces";

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
  const { selected, selectPosition } = usePlacesUI();
  const { data: savedPlaces = [] } = useSavedPlaces();

  return (
    <div className="h-full w-full">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler />
        <Recenter selected={selected} zoom={15} />

       {savedPlaces.map((p) => (
        <Marker
          key={p.id}
          position={p.position}
          eventHandlers={{
            click: () => selectPosition(p.position, p.name),
          }}
        >
          <Popup>
            <strong>{p.name}</strong>
            <br />
            {p.position[0].toFixed(6)}, {p.position[1].toFixed(6)}
          </Popup>
        </Marker>
      ))}

      {selected && (
        <Marker position={selected}>
          <Popup>Local selecionado</Popup>
        </Marker>
      )}
      </MapContainer>
    </div>
  );
}
