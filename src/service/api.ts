const API_URL = "https://nominatim.openstreetmap.org/search";

export async function fetchPlaces(localName: string) {
  const q = localName.trim();
  if (!q) return [];

  const response = await fetch(`${API_URL}?q=${encodeURIComponent(q)}&format=json`, {
    headers: {
      "Accept": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Erro na busca! Status: ${response.status}`);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const data = (await response.json()) as any[];

  return data.map((item, index) => ({
    id: item.place_id ? String(item.place_id) : String(index),
    name: String(item.display_name),
    position: {
      lat: Number(item.lat),
      lng: Number(item.lon),
    },
  }));
}
