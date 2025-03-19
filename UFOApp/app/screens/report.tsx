import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { SightingContext } from "../../context/sightingscontext";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker"; // Expo's DateTimePicker

export default function ReportScreen() {
  const {
    temporaryMarker,
    addSighting,
    removeSighting,
    loadSightings,
    setTemporaryMarker,
  } = useContext(SightingContext);
  const [witnessName, setWitnessName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false); // State to control date picker visibility
  const [selectedDate, setSelectedDate] = useState(new Date()); // State for the selected date
  const router = useRouter();

  // Automatically open camera
  useFocusEffect(
    useCallback(() => {
      const openCamera = async () => {
        const result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
        });
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
      openCamera();
    }, [])
  );

  // Show date picker
  const showDatePicker = () => setDatePickerVisible(true);

  // Hide date picker
  const hideDatePicker = () => setDatePickerVisible(false);

  // Handle date selection for native platforms
  const handleConfirm = (event: any, selectedDate: any) => {
    if (event.type === "set") {
      const currentDate = selectedDate || new Date();
      setSelectedDate(currentDate); // Update selected date
      hideDatePicker(); // Close the date picker after selection
    }
  };

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
      dateTime: selectedDate.toISOString(),
    });

    setTemporaryMarker(null); // Clear the temporary marker
    // **Ensure the sightings list updates**
    await loadSightings();
    router.push("/screens/list");

    // Reset the input fields
    setWitnessName("");
    setDescription("");
    setImage(null);
  };

  // Cancel sighting
  const cancelSighting = () => {
    if (temporaryMarker) {
      removeSighting(temporaryMarker.id);
    }
    router.push("/screens/map");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Report Sighting</Text>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <Text style={styles.label}>Witness Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter witness name"
        onChangeText={setWitnessName}
        value={witnessName}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={[styles.input, styles.multilineInput]} // Apply multiline style
        placeholder="Enter description"
        onChangeText={setDescription}
        value={description}
        multiline
        numberOfLines={4}
      />

      <Text style={styles.label}>Date of Sighting</Text>
      <TouchableOpacity onPress={showDatePicker} style={styles.dateButton}>
        <Text style={styles.dateText}>
          {selectedDate ? selectedDate.toDateString() : "Select Date"}
        </Text>
      </TouchableOpacity>

      {/* Native DateTimePicker for iOS/Android */}
      {isDatePickerVisible && Platform.OS !== "web" && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleConfirm}
        />
      )}

      {/* Custom HTML Date Picker for Web */}
      {Platform.OS === "web" && isDatePickerVisible && (
        <input
          type="date"
          value={selectedDate.toISOString().split("T")[0]} // Format the date as yyyy-mm-dd
          onChange={(e) => {
            const newDate = new Date(e.target.value);
            setSelectedDate(newDate);
            hideDatePicker(); // Close date picker after selecting a date
          }}
          style={styles.datePickerWeb}
        />
      )}

      <TouchableOpacity
        style={[styles.buttonContainer, styles.saveButton]}
        onPress={saveSighting}
      >
        <Text style={styles.buttonText}>Save Sighting</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.buttonContainer, styles.cancelButton]}
        onPress={cancelSighting}
      >
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items from the top
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    paddingHorizontal: 30,
    paddingTop: 50, // Add some top padding
  },
  header: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1C1C1C",
    marginBottom: 30,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1C1C1C",
    marginBottom: 8,
    alignSelf: "flex-start",
    width: "100%",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  multilineInput: {
    height: 100, // Increased height for description
    textAlignVertical: "top", // Start text from the top
  },
  buttonContainer: {
    flexDirection: "row",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    borderColor: "#388E3C",
  },
  cancelButton: {
    backgroundColor: "#FF5252",
    borderColor: "#F57C00",
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
  dateButton: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },
  datePickerWeb: {
    width: "100%",
    padding: 10,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 16,
    color: "#333",
  },
});
