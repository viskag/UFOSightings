import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, Image } from "react-native";

interface Sighting {
  id: number;
  picture: any;
  witnessName: string;
  dateTime: string;
  city: string;
  date: string;
  description?: string;
}

export default function ListScreen() {
  const [sightings, setSightings] = useState<Sighting[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://sampleapis.assimilate.be/ufo/sightings')
      .then(response => response.json())
      .then(data => {
        setSightings(data);
        setLoading(false);
      });
  }, []);

  return (
    <View>
      <FlatList
        data={sightings}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View>
            <Image source={{ uri: item.picture }} style={{ width: 100, height: 100 }} />
            <Text>{item.witnessName}</Text>
            <Text>{new Date(item.dateTime).toLocaleString()}</Text>
            <Text>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
}





