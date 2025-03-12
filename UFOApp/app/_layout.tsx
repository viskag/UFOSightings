import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SightingProvider } from "../context/sightingscontext";
import { StyleSheet } from "react-native";

export default function RootLayout() {
  return (
    <SightingProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "UFO Reporter v0.5",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="screens/list"
          options={{
            title: "Sightings List",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="screens/map"
          options={{
            title: "Map",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="map" color={color} size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="screens/report"
          options={{
            title: "Report",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="camera" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SightingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
});
