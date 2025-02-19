"use dom";

import React, { useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Platform, View } from "react-native";
// import MapView, { Marker as RNMarker } from "react-native-maps"; // for mobile
import { SightingContext } from "../context/sightingscontext";

export default function MapScreen() {
  // Get Sightings and loadSightings method from context
  const { sightings, loadSightings } = useContext(SightingContext);

  // Load sightings from AsyncStorage when the component mounts
  useEffect(() => {
    loadSightings(); // Load locally stored sightings instead of fetching from API
  }, []);

  // Dynamically import react-leaflet only for web
  const { MapContainer, TileLayer, Marker, Popup } = require("react-leaflet");

  // Icon
  const L = require("leaflet");
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
      minZoom={5}
      maxZoom={18}
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
          position={[sighting.location?.latitude, sighting.location?.longitude]}
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
