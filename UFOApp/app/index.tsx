import { View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { Image } from "react-native";
import { ImageBackground } from "react-native";

export default function HomeScreen() {
  const router = useRouter();

  return (

    <ImageBackground
      source={require("../assets/icons/background.jpg")} 
      style={styles.container}
      resizeMode="cover" 
    >

      <View style={styles.wrapper}>
        <Text style={styles.header}>Menu</Text>

        {}
        <TouchableOpacity
          style={[styles.buttonContainer, styles.viewMapButton]}
          onPress={() => router.push("/screens/map")}
        >
          <Image
            source={require("../assets/icons/iconMap.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>View Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.viewSightingsButton]}
          onPress={() => router.push("/screens/list")}
        >
          <Image
            source={require("../assets/icons/iconList.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>View Sightings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.addSightingButton]}
          onPress={() => router.push("/screens/report")}
        >
          <Image
            source={require("../assets/icons/iconAdd.png")}
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Add Sighting</Text>
        </TouchableOpacity>
      </View>

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  
  wrapper: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    paddingHorizontal: 30,
  },
  container: {
    flex: 1, 
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
    color: "lightblue",
    marginBottom: 50,
    fontFamily: "Verdana",
    //color: "#1C1C1C",
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