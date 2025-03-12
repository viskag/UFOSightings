import { View, Text, Button, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Image } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>

      {/* Custom Button with PNG Icons */}
      <TouchableOpacity
        style={[styles.buttonContainer, styles.viewMapButton]}
        onPress={() => router.push("./screens/map")}
      >
        <Image
          source={require("../assets/icons/iconMap.png")}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>View Map</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.viewSightingsButton]}
        onPress={() => router.push("./screens/list")}
      >
        <Image
          source={require("../assets/icons/iconList.png")}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>View Sightings</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.addSightingButton]}
        onPress={() => router.push("./screens/report")}
      >
        <Image
          source={require("../assets/icons/iconAdd.png")}
          style={styles.icon}
        />
        <Text style={styles.buttonText}>Add Sighting</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 30,
  },
  header: {
    fontSize: 32, 
    fontWeight: "800", 
    color: "#1C1C1C", 
    marginBottom: 50, 
  },
  buttonContainer: {
    flexDirection: "row", 
    width: "80%", 
    marginBottom: 20, 
    paddingVertical: 15, 
    borderRadius: 15, 
    alignItems: "center", 
    justifyContent: "center", 
    elevation: 5, 
  },
  
  viewMapButton: {
    backgroundColor: "#4CAF50", 
    borderColor: "#388E3C", 
  },
  viewSightingsButton: {
    backgroundColor: "#2196F3", 
    borderColor: "#1976D2", 
  },
  addSightingButton: {
    backgroundColor: "#FF9800", 
    borderColor: "#F57C00",
  },
  buttonText: {
    fontSize: 18, 
    fontWeight: "600", 
    color: "#ffffff", 
    marginLeft: 10, 
  },
  icon: {
    width: 24, 
    height: 24, 
    marginRight: 10, 
  },
});
