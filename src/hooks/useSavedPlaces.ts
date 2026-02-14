import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readPlaces, writePlaces, type SavedPlace } from "@/storage/placesStorage";
import type { LatLngTuple } from "@/context/PlacesUIContext";

const KEY = ["places", "saved"] as const;
const COORD_PRECISION = 6;

function normalizeName(name: string) {
  return name.trim().toLowerCase();
}

function samePosition(a: LatLngTuple, b: LatLngTuple) {
  return (
    a[0].toFixed(COORD_PRECISION) === b[0].toFixed(COORD_PRECISION) &&
    a[1].toFixed(COORD_PRECISION) === b[1].toFixed(COORD_PRECISION)
  );
}

export function useSavedPlaces() {
  return useQuery({
    queryKey: KEY,
    queryFn: async () => readPlaces(),
    staleTime: Infinity,
  });
}

export function useSavePlace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; position: LatLngTuple }) => {
      const name = data.name.trim();
      if (!name) throw new Error("Nome obrigatorio");

      const current = readPlaces();

      const duplicateByName = current.some(
        (p) => normalizeName(p.name) === normalizeName(name)
      );
      if (duplicateByName) {
        throw new Error("Ja existe um local salvo com esse nome");
      }

      const duplicateByPosition = current.some((p) =>
        samePosition(p.position, data.position)
      );
      if (duplicateByPosition) {
        throw new Error("Esse local ja esta salvo");
      }

      const newPlace: SavedPlace = {
        id: crypto.randomUUID(),
        name,
        position: data.position,
        createdAt: Date.now(),
      };

      const next = [newPlace, ...current];
      writePlaces(next);
      return newPlace;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}

export function useDeletePlace() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const current = readPlaces();
      const next = current.filter((p) => p.id !== id);
      writePlaces(next);
      return id;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: KEY }),
  });
}
