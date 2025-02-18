import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

interface Sighting {
  id: number;
  witnessName: string;
  description: string;
  dateTime: string;
  picture: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function MapScreen() {

  
  const [sightings, setSightings] = useState<Sighting[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://sampleapis.assimilate.be/ufo/sightings")
      .then((response) => response.json())
      .then((data: Sighting[]) => {
        setSightings(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error:", error);
        setLoading(false);
      });

  }, []);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Leaflet Map</title>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
        <style>
          #map { height: 100vh; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <script>
          var map = L.map('map').setView([0, 0], 2);
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
          }).addTo(map);
          
          const sightings = ${JSON.stringify(sightings)};
          sightings.forEach(sighting => {
            L.marker([sighting.location.latitude, sighting.location.longitude])
              .addTo(map)
              .bindPopup('<b>' + sighting.witnessName + '</b><br>' + sighting.description);
          });
        </script>
      </body>
    </html>
  `;

  if (loading) return <ActivityIndicator size="large" />;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{ html: htmlContent }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});


