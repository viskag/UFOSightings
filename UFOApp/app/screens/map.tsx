"use dom";

import React, { useContext, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { Platform, View } from "react-native";
import SightingContext from "../../context/sightingscontext";
import { useRouter } from "expo-router";

export default function MapScreen() {
  // Get Sightings and loadSightings method from context
  const { sightings, loadSightings, setTemporaryMarker } =
    useContext(SightingContext);
  const router = useRouter();

  // Load sightings from AsyncStorage when the component mounts
  useEffect(() => {
    loadSightings(); // Load locally stored sightings instead of fetching from API
  }, []);

  // Dynamically import react-leaflet only for web
  const {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMapEvents,
  } = require("react-leaflet");

  // Icon
  const L = require("leaflet");
  const iconX = L.icon({
    iconUrl:
      "https://raw.githubusercontent.com/similonap/public_icons/refs/heads/main/location-pin.png",
    iconSize: [48, 48],
    popupAnchor: [-3, 0],
  });

  // Handle map clicks to add a permanent marker
  const MapClickHandler = () => {
    useMapEvents({
      click: async (e: { latlng: { lat: number; lng: number } }) => {
        const { lat, lng } = e.latlng;

        // Refresh temporarymarker
        setTemporaryMarker(null);

        // Store location in temporaryMarker instead of immediately adding
        setTemporaryMarker({
          id: Date.now(),
          city: "", // Will be updated when saving
          description: "",
          status: "",
          location: { latitude: lat, longitude: lng },
        });

        router.push("/screens/report");
      },
    });
    return null;
  };

  return (
    <MapContainer
      center={{ lat: 51.505, lng: -0.09 }}
      zoom={13}
      minZoom={5}
      maxZoom={100}
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
      <MapClickHandler />
      {sightings.map((sighting) => (
        <Marker
          key={sighting.id}
          position={[sighting.location?.latitude, sighting.location?.longitude]}
          icon={iconX}
        >
          <Popup>
            <View
              style={{
                backgroundColor: "white",
                padding: 10,
                width: 120,
                alignItems: "center",
              }}
            >
              {sighting.picture ? (
                <img
                  src={sighting.picture}
                  alt="UFO Sighting"
                  style={{ width: "100px", height: "100px", borderRadius: 5 }}
                />
              ) : (
                <p>No Image</p>
              )}
              <p>{sighting.description}</p>
              <div
                style={{
                  backgroundColor: "#007bff", // Example button color
                  color: "white",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginTop: "10px",
                }}
                onClick={() => router.push(`/detail?id=${sighting.id}`)}
              >
                View Details
              </div>
            </View>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
