import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "leaflet/dist/leaflet.css";
import "./lib/leafletMarkerFix";
import { PlacesUIProvider } from './context/PlacesUIContext.tsx';

// Create a client
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <PlacesUIProvider>
        <App />
      </PlacesUIProvider>
    </QueryClientProvider>
)
