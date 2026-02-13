import React, { createContext, useContext, useMemo, useState } from "react";

export type LatLngTuple = [number, number];

type PlacesUIValue = {
  selected: LatLngTuple | null;
  draftName: string;
  selectPosition: (pos: LatLngTuple, suggestedName?: string) => void;
  setDraftName: (name: string) => void;
  clearDraft: () => void;
};

const PlacesUIContext = createContext<PlacesUIValue | null>(null);

export function PlacesUIProvider({ children }: { children: React.ReactNode }) {
  const [selected, setSelected] = useState<LatLngTuple | null>(null);
  const [draftName, setDraftName] = useState("");

  const selectPosition = (pos: LatLngTuple, suggestedName?: string) => {
    setSelected(pos);
    if (suggestedName !== undefined) setDraftName(suggestedName);
  };

  const clearDraft = () => {
    setSelected(null);
    setDraftName("");
  };

  const value = useMemo(
    () => ({
      selected,
      draftName,
      selectPosition,
      setDraftName,
      clearDraft,
    }),
    [selected, draftName]
  );

  return <PlacesUIContext.Provider value={value}>{children}</PlacesUIContext.Provider>;
}

export function usePlacesUI() {
  const ctx = useContext(PlacesUIContext);
  if (!ctx) throw new Error("usePlacesUI precisa estar dentro de PlacesUIProvider");
  return ctx;
}
