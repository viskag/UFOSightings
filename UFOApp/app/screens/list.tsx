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
    padding: 10,
  },
  itemContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
