import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  Children,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

// Define the structure of a Sighting object
export interface Sighting {
  id: number;
  picture?: string;
  witnessName?: string;
  dateTime?: string;
  city: string;
  date?: string;
  description?: string;
  location?: {
    latitude: number;
    longitude: number;
  };
}

// Define the context properties and methods
interface SightingContextProps {
  sightings: Sighting[];
  addSighting: (sighting: Sighting) => void;
  loadSightings: () => void;
}

// Create the context with default empty values
export const SightingContext = createContext<SightingContextProps>({
  sightings: [],
  addSighting: () => {},
  loadSightings: () => {},
});

const STORAGE_KEY = "UFO_SIGHTINGS";

// SightingProvider wraps the app and provides sightings data
export const SightingProvider = ({ children }: { children: ReactNode }) => {
  const [sightings, setSightings] = useState<Sighting[]>([]);

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
        // Fetch data from the API as a fallback
        const response = await axios.get(
          "https://sampleapis.assimilate.be/ufo/sightings"
        );
        setSightings(response.data);
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(response.data));
      }
    } catch (error) {
      console.error("Failed to load sightings", error);
    }
  };
  // Add a new sighting and save it to AsyncStorage
  const addSighting = async (sighting: Sighting) => {
    try {
      const updatedSightings = [...sightings, sighting];
      setSightings(updatedSightings);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSightings));
      console.log("New sighting added and saved locally");
    } catch (error) {
      console.error("Failed to add sighting", error);
    }
  };

  return (
    <SightingContext.Provider
      value={{
        sightings,
        addSighting,
        loadSightings,
      }}
    >
      {children}
    </SightingContext.Provider>
  );
};
