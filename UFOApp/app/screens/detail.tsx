import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

interface Sighting {
  id: number;
  picture: string;
  witnessName: string;
  dateTime: string;
  city: string;
  description?: string;
  status: string;
  location: { latitude: number; longitude: number };
}

export default function DetailScreen() {
  const [sighting, setSighting] = useState<Sighting | null>(null);

  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    if (id) {
      fetch(`https://sampleapis.assimilate.be/ufo/sightings/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setSighting(data);
        });
    }
  }, [id]);

  if (!sighting) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: sighting.picture }}
        style={styles.image}
      />
      <Text style={styles.title}>Witness: {sighting.witnessName}</Text>
      <Text>Date: {new Date(sighting.dateTime).toLocaleString()}</Text>
      <Text>Status: {sighting.status}</Text>
      <Text>Description: {sighting.description}</Text>
      <Text>Location: Latitude {sighting.location.latitude}, Longitude {sighting.location.longitude}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
