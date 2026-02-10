import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { Picker } from "@react-native-picker/picker";
import Slider from "@react-native-community/slider";

// URL du back-end
const BACKEND_URL = "http://10.162.128.180:3000";

export default function ResultsScreen({ route }) {

  // Récupérer coordonnées utilisateur depuis HomeScreen
  const { lat, lng } = route.params;

  // Liste des états
  const [places, setPlaces] = useState([]); // Lieux proches
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [radius, setRadius] = useState(1000);

  // Pagination
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Map pleine écran
  const [fullMap, setFullMap] = useState(false);

  // Charger catégories
  useEffect(() => {
    fetch(`${BACKEND_URL}/api/places/categories`)
      .then(res => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  // Recherche lieux
  const fetchPlaces = async (pageToLoad = 1) => {
    let url = `${BACKEND_URL}/api/places/nearby?lat=${lat}&lng=${lng}&radius=${radius}&page=${pageToLoad}`;

    if (category) {
      url += `&category=${category}`;
    }

    const res = await fetch(url);
    const data = await res.json();

    setPlaces(pageToLoad === 1 ? data : [...places, ...data]);
  };

  // Pagination infinie
  const loadMore = async () => {
    if (loading) return;

    setLoading(true);
    const nextPage = page + 1;
    await fetchPlaces(nextPage);
    setPage(nextPage);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      {/* Toggle carte */}
      <Button
        title={fullMap ? "Voir la liste" : "Carte plein écran"}
        onPress={() => setFullMap(!fullMap)}
      />

      {/* Carte */}
      <MapView
        style={fullMap ? styles.fullMap : styles.map}
        initialRegion={{
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          coordinate={{ latitude: lat, longitude: lng }}
          title="Position"
        />

        {places.map(place => (
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

      {!fullMap && (
        <>
          {/* Filtres */}
          <Text>Rayon : {radius} m</Text>
          <Slider
            minimumValue={500}
            maximumValue={5000}
            step={500}
            value={radius}
            onValueChange={setRadius}
          />

          <Picker
            selectedValue={category}
            onValueChange={setCategory}
          >
            <Picker.Item label="Toutes catégories" value="" />
            {categories.map(cat => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>

          <Button
            title="Appliquer filtres"
            onPress={() => {
              setPage(1);
              fetchPlaces(1);
            }}
          />

          {/* Liste + pagination */}
          <FlatList
            data={places}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => (
              <Text style={styles.item}>
                {item.properties?.name || "Lieu"}
              </Text>
            )}
            onEndReached={loadMore}
            onEndReachedThreshold={0.5}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { height: "40%" },
  fullMap: { ...StyleSheet.absoluteFillObject },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});
