import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { readPlaces, writePlaces, type SavedPlace } from "@/storage/placesStorage";
import type { LatLngTuple } from "@/context/PlacesUIContext";

const KEY = ["places", "saved"] as const;

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
      if (!name) throw new Error("Nome obrigatório");

      const current = readPlaces();
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
