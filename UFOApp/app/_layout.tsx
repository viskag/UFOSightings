import { Tabs } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SightingProvider } from "./context/sightingscontext";

export default function RootLayout() {
  return (
    <SightingProvider>
      <Tabs>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
      </Tabs>
    </SightingProvider>
  );
}
