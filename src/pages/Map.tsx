import { ListPlaces } from "@/components/ListPlaces";
import MapView from "@/components/MapView";
import { SearchPlaces } from "@/components/SearchPlaces";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SavePlace } from "@/components/SavePlace";
import { usePlacesUI } from "@/context/PlacesUIContext";
import { SavedPlacesList } from "@/components/SavedPlacesList";


export default function MapPage() {
  const [searchText, setSearchText] = useState("");
  const [submitted, setSubmitted] = useState("");
  const { selectPosition } = usePlacesUI();

  return (
    <div className="flex h-[100dvh] w-full flex-col overflow-hidden md:flex-row">
      <aside className="max-h-[55dvh] w-full overflow-y-auto border-b bg-white p-3 md:max-h-none md:w-[340px] md:min-w-[340px] md:border-b-0 md:border-r">
        <Tabs defaultValue="searchPlaces" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="searchPlaces" className="flex-1">
              Pesquisar
            </TabsTrigger>
            <TabsTrigger value="savePlaces" className="flex-1">
              Salvos
            </TabsTrigger>
          </TabsList>

          <TabsContent className="mt-4 flex flex-col gap-4" value="searchPlaces">
            <SearchPlaces
              value={searchText}
              onChange={setSearchText}
              onSubmit={() => setSubmitted(searchText)}
            />

            <ListPlaces
              placeName={submitted}
              onPick={(place) => {
                selectPosition([place.position.lat, place.position.lng], place.name);
              }}
            />

            <SavePlace />
          </TabsContent>
              
          <TabsContent className="mt-4" value="savePlaces">
            <SavedPlacesList />
          </TabsContent>
        </Tabs>
      </aside>

      <main className="min-h-[45dvh] flex-1 md:min-h-0">
        <MapView />
      </main>
    </div>
  );
}
