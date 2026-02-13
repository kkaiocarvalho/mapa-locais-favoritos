import { usePlacesUI } from "@/context/PlacesUIContext";
import { useSavePlace } from "@/hooks/useSavedPlaces";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Input } from "./ui/input";

export function SavePlace() {
  const { selected, draftName, setDraftName, clearDraft } = usePlacesUI();
  const save = useSavePlace();

  if (!selected) return null;

  const latLngText = `${selected[0].toFixed(6)}, ${selected[1].toFixed(6)}`;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;
    save.mutate(
      { name: draftName, position: selected },
      { onSuccess: () => clearDraft() }
    );
  }

  return (
    <Card className="p-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="text-sm font-medium">Insira um nome para salvar</label>

        <Input
          value={draftName}
          onChange={(e) => setDraftName(e.target.value)}
          placeholder='Ex: "Casa", "Trabalho", "Escola"'
        />

        <Input value={latLngText} readOnly />

        {save.isError && (
          <div className="text-sm text-red-600">
            {(save.error as Error).message}
          </div>
        )}

        <div className="flex flex-col gap-2 sm:flex-row">
          <Button
            className="w-full sm:w-auto"
            type="submit"
            disabled={!draftName.trim() || save.isPending}
          >
            {save.isPending ? "Salvando..." : "Salvar local"}
          </Button>

          <Button
            className="w-full sm:w-auto"
            type="button"
            variant="outline"
            onClick={clearDraft}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </Card>
  );
}
