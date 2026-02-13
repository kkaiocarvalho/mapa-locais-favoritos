import type { LatLngTuple } from "@/context/PlacesUIContext";

export type SavedPlace = {
  id: string;
  name: string;
  position: LatLngTuple;
  createdAt: number;
};

const KEY = "locais_salvos";

export function readPlaces(): SavedPlace[] {
  const raw = localStorage.getItem(KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as SavedPlace[];
  } catch {
    return [];
  }
}

export function writePlaces(places: SavedPlace[]) {
  localStorage.setItem(KEY, JSON.stringify(places));
}
