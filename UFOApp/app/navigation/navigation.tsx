import { Stack } from "expo-router";

export default function Navigation() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="map" options={{ title: "Map" }} />
      <Stack.Screen name="list" options={{ title: "Sightings List" }} />
      <Stack.Screen name="report" options={{ title: "Report Sighting" }} />
    </Stack>
  );
}
