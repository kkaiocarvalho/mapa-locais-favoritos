import { useDeletePlace, useSavedPlaces } from "@/hooks/useSavedPlaces";
import { usePlacesUI } from "@/context/PlacesUIContext";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export function SavedPlacesList() {
  const { data: places = [], isLoading } = useSavedPlaces();
  const del = useDeletePlace();
  const { selectPosition } = usePlacesUI();

  if (isLoading) return <div className="text-sm">Carregando...</div>;

  if (places.length === 0) {
    return <div className="text-sm opacity-70">Nenhum local salvo ainda.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {places.map((p) => (
        <Card key={p.id} className="p-3">
          <div className="text-sm font-medium">{p.name}</div>
          <div className="text-xs opacity-70">
            {p.position[0].toFixed(6)}, {p.position[1].toFixed(6)}
          </div>

          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <Button
              className="w-full sm:w-auto"
              size="sm"
              variant="outline"
              onClick={() => selectPosition(p.position, p.name)}
            >
              Ver no mapa
            </Button>

            <Button
              className="w-full sm:w-auto"
              size="sm"
              variant="destructive"
              onClick={() => del.mutate(p.id)}
              disabled={del.isPending}
            >
              Remover
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}
