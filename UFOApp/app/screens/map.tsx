import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { View } from "react-native";
// import MapView, { Marker as RNMarker } from "react-native-maps"; // for mobile
import axios from "axios";

interface Sighting {
  id: number;
  location: {
    latitude: number;
    longitude: number;
  };
  city: string;
  description: string;
}

export default function MapScreen() {
  const [sightings, setSightings] = useState<Sighting[]>([]);

  useEffect(() => {
    axios
      .get("https://sampleapis.assimilate.be/ufo/sightings")
      .then((response) => setSightings(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Dynamically import react-leaflet only for web
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");
  const L = require("leaflet");

  // Icon
  const iconX = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/similonap/public_icons/refs/heads/main/location-pin.png",
    iconSize: [48, 48],
    popupAnchor: [-3, 0],
  });
  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      style={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
      }}
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution='&copy; <a href="https://www.openstreretmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {sightings.map((sighting) => (
        <Marker
          key={sighting.id}
          position={[sighting.location.latitude, sighting.location.longitude]}
          icon={iconX}
        >
          <Popup>
            <View style={{ backgroundColor: "white", padding: 10, width: 100 }}>
              <p>{sighting.city}</p>
              <p>{sighting.description}</p>
            </View>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
