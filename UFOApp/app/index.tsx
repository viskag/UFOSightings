import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Menu</Text>
      <Button title="View Map" onPress={() => router.push("./screens/map")} />
      <Button
        title="View Sightings"
        onPress={() => router.push("./screens/list")}
      />
      <Button
        title="Add Sighting"
        onPress={() => router.push("./screens/report")}
      />
    </View>
  );
}
