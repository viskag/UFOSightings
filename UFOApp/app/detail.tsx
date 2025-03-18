import SightingContext, { Sighting } from "@/context/sightingscontext";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useContext, useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, ActivityIndicator } from "react-native";

export default function DetailScreen() {
  const [sighting, setSighting] = useState<Sighting | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { sightings } = useContext(SightingContext);
  console.log("DetailScreen Sightings from Context:", sightings);

  const searchParams = useSearchParams(); // Use useSearchParams
  const id = searchParams.get("id"); // Retrieve the id parameter
  console.log("DetailScreen ID:", id);

  useEffect(() => {
    if (id) {
      setLoading(true);
      setError(null);

      // Try to find the sighting in the context first
      const foundSighting = sightings?.find((s) => {
        console.log("Searching for ID:", id, "Current Sighting ID:", s.id);
        return s.id.toString() === id;
      });

      if (foundSighting) {
        setSighting(foundSighting);
        setLoading(false);
      } else {
        // If not found in context, fetch from API
        fetch(`https://sampleapis.assimilate.be/ufo/sightings/${id}`)
          .then((response) => {
            if (!response.ok) {
              console.log("DetailScreen API Response:", response);
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            console.log("DetailScreen API Data:", data);
            setSighting(data);
            setLoading(false);
          })
          .catch((err) => {
            console.error("DetailScreen API Error:", err);
            setError("Failed to load sighting details.");
            setLoading(false);
          });
      }
    } else {
      setLoading(false);
    }
  }, [id, sightings]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!sighting) {
    return (
      <View style={styles.centered}>
        <Text>Sighting not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {sighting.picture && (
        <Image source={{ uri: sighting.picture }} style={styles.image} />
      )}
      <Text style={styles.title}>Witness: {sighting.witnessName}</Text>
      <Text>
        Date:{" "}
        {sighting.dateTime
          ? new Date(sighting.dateTime).toLocaleString()
          : "N/A"}
      </Text>
      <Text>Status: {sighting.status}</Text>
      {sighting.description && <Text>Description: {sighting.description}</Text>}
      {sighting.location && (
        <Text>
          Location: {sighting.location.latitude}, {sighting.location.longitude}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: "red",
  },
});
