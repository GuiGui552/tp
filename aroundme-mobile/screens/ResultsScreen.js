import { View, Text, StyleSheet, FlatList } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default function ResultsScreen({ route }) {
  const { lat, lng } = route.params;
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch(
      `http://10.0.2.2:3000/api/places/nearby?lat=${lat}&lng=${lng}&radius=1000`
    )
      .then((res) => res.json())
      .then((data) => setPlaces(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Position utilisateur */}
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          title="Vous êtes ici"
        />

        {/* Lieux */}
        {places.map((place) => (
          <Marker
            key={place._id}
            coordinate={{
              latitude: place.geometry.coordinates[1],
              longitude: place.geometry.coordinates[0],
            }}
            title={place.properties?.name || "Lieu"}
          />
        ))}
      </MapView>

      <FlatList
        data={places}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={styles.item}>
            {item.properties?.name || "Lieu sans nom"}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { height: "50%" },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
