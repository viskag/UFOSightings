import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  Button,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import SightingContext from "../../context/sightingscontext";

export default function ListScreen() {
  const { sightings, loadSightings, removeSighting } =
    useContext(SightingContext);

  // Reload sightings when screen is focused
  useFocusEffect(
    React.useCallback(() => {
      loadSightings();
    }, [])
  );

  if (!sightings) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sightings.length === 0 ? (
        <View style={styles.centered}>
          <Text>No sightings available. Add a new sighting!</Text>
        </View>
      ) : (
        <FlatList
          data={sightings}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              {item.picture && (
                <Image source={{ uri: item.picture }} style={styles.image} />
              )}
              <Text>{item.city || "Unknown City"}</Text>
              <Text>{item.witnessName || "Unknown Witness"}</Text>
              <Text>
                {item.dateTime
                  ? new Date(item.dateTime).toLocaleString()
                  : "Unknown Date"}
              </Text>
              <Text>{item.description}</Text>
              <Button
                title="Delete"
                onPress={() => removeSighting(item.id)}
                color="red"
              />
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5", 
  },
  itemContainer: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff", 
    borderRadius: 10,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5, 
    justifyContent: "center", 
    alignItems: "center", 
    textAlign: "center", 
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 12,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    color: "#333", 
    marginBottom: 5,
    textAlign: "center", 
  },
  button: {
    marginTop: 10,
    backgroundColor: "#ff4d4d", 
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  buttonText: {
    color: "#fff", 
    fontSize: 16,
    textAlign: "center",
  },
});

