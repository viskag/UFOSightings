import React, { createContext, useEffect, useState, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Define the structure of a Sighting object
export interface Sighting {
  id: number;
  picture?: string | null;
  witnessName?: string;
  dateTime?: string;
  city: string;
  description?: string;
  status: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Define the context properties and methods
interface SightingContextProps {
  sightings: Sighting[];
  addSighting: (sighting: Sighting) => void;
  removeSighting: (id: number) => void;
  loadSightings: () => void;
  temporaryMarker: Sighting | null;
  setTemporaryMarker: (sighting: Sighting | null) => void;
}

// Create the context with default empty values
export const SightingContext = createContext<SightingContextProps>({
  sightings: [],
  addSighting: () => {},
  removeSighting: () => {},
  loadSightings: () => {},
  temporaryMarker: null,
  setTemporaryMarker: () => {},
});

const STORAGE_KEY = "UFO_SIGHTINGS";

// SightingProvider wraps the app and provides sightings data
export const SightingProvider = ({ children }: { children: ReactNode }) => {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [temporaryMarker, setTemporaryMarker] = useState<Sighting | null>(null);

  // Load sightings when the app starts
  useEffect(() => {
    loadSightings();
  }, []);

  // Load sightings from AsyncStorage or API if not available locally
  const loadSightings = async () => {
    try {
      const storedSightings = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedSightings) {
        setSightings(JSON.parse(storedSightings));
      } else {
        setSightings([]); // Ensure empty array if no data is present
      }
    } catch (error) {
      console.error("Failed to load sightings", error);
    }
  };
  // Add a new sighting and update AsyncStorage
  const addSighting = async (sighting: Sighting) => {
    try {
      const { latitude, longitude } = sighting.location!;

      // Fetch the nearest city using OpenStreetMap's Nominatim API
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
      );
      const data = await response.json();

      // Extract city name, or fallback to "Unknown"
      const cityName =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        "Unknown";

      // Create a new sighting object with the city name
      const updatedSighting = { ...sighting, city: cityName };

      // Save to AsyncStorage and update state
      const updatedSightings = [...sightings, updatedSighting];
      setSightings(updatedSightings);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSightings));

      console.log(`New sighting added at ${cityName}`);

      // Reload the sightings immediately
      await loadSightings();
    } catch (error) {
      console.error("Failed to add sighting", error);
    }
  };
  // Remove a sighting (if user cancels it)
  const removeSighting = async (id: number) => {
    try {
      const updatedSightings = sightings.filter(
        (sighting) => sighting.id !== id
      );
      setSightings(updatedSightings);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSightings));
      loadSightings();
      console.log("Sighting removed");
    } catch (error) {
      console.error("Failed to remove sighting", error);
    }
  };
  return (
    <SightingContext.Provider
      value={{
        sightings,
        addSighting,
        removeSighting,
        loadSightings,
        temporaryMarker,
        setTemporaryMarker,
      }}
    >
      {children}
    </SightingContext.Provider>
  );
};
export default SightingContext;
