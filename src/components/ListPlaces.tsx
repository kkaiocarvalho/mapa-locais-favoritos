import type { PlaceResult } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetchPlaces } from "@/service/api";
import { Map } from "lucide-react";

export function ListPlaces({
  placeName,
  onPick,
}: {
  placeName: string;
  onPick: (place: PlaceResult) => void;
}){

    const query = useQuery({
    queryKey: ["places", placeName],       
    queryFn: () => fetchPlaces(placeName),
    enabled: placeName.trim().length >= 3, 
    staleTime: 1000 * 60 * 5,   
  });

    return(
        <div>
            {query.data && query.data.length > 0 && (
        <ul className="max-h-[35vh] space-y-2 overflow-auto pr-1 md:max-h-full">
          {query.data.map((p) => (
            <li
              key={p.id}
              className="cursor-pointer rounded-xl border shadow p-2 hover:bg-muted"
              onClick={() => onPick(p)}
            >
              <div className="text-sm font-medium ">{p.name}</div>
              <div className="text-xs opacity-70 flex gap-2 items-center">
               <Map/> {p.position.lat.toFixed(6)}, {p.position.lng.toFixed(6)}
              </div>
            </li>
          ))}
        </ul>
      )}
        </div>
    )
}
