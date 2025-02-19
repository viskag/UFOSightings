import React, { useContext, useState, useEffect } from "react";
import { View, Text, Button, TextInput, Image } from "react-native";
import { useRouter } from "expo-router";
import { SightingContext } from "../context/sightingscontext";
import * as ImagePicker from "expo-image-picker";

export default function ReportScreen() {
  const {
    temporaryMarker,
    addSighting,
    sightings,
    removeSighting,
    loadSightings,
    setTemporaryMarker,
  } = useContext(SightingContext);
  const [witnessName, setWitnessName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  // Automatically open camera
  useEffect(() => {
    // Refresh fields
    setWitnessName("");
    setDescription("");
    setImage(null);

    const openCamera = async () => {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
    openCamera();
  }, []);

  // Save sighting
  const saveSighting = async () => {
    if (!temporaryMarker || !temporaryMarker.location) {
      console.error("Error: No location selected.");
      return;
    }

    // Add sighting
    await addSighting({
      ...temporaryMarker,
      witnessName: witnessName || "Anonymous",
      description: description || "No description provided",
      picture: image,
      dateTime: new Date().toISOString(),
    });

    setTemporaryMarker(null); // Clear the temporary marker
    // **Ensure the sightings list updates**
    await loadSightings();
    router.push("/screens/list");
  };
  // Cancel sighting
  const cancelSighting = () => {
    if (temporaryMarker) {
      removeSighting(temporaryMarker.id);
    }
    router.push("/screens/map");
  };
  return (
    <View style={{ flex: 1, padding: 20 }}>
      {image && (
        <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
      )}
      <TextInput placeholder="Witness Name" onChangeText={setWitnessName} />
      <TextInput placeholder="Description" onChangeText={setDescription} />
      <Button title="Save Sighting" onPress={saveSighting} />
      <Button title="Cancel" onPress={cancelSighting} color="red" />
    </View>
  );
}
