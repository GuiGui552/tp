import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

export default function HomeScreen({ navigation }) {
  // Permet de demander l'accès a la géo-loc pour obtenir la position
  /*const getLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      Alert.alert("Permission refusée", "La géolocalisation est requise");
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    navigation.navigate("Results", {
      lat: latitude,
      lng: longitude,
    });
  };*/

  // Va mettre un point dans Paris pour Test -> Tour Eiffel
  const getLocation = () => {
    const latitude = 48.85837;   
    const longitude = 2.294481;

    // Appel page ResultsScreen + param (lat, lng)
    navigation.navigate("Results", { 
      lat: latitude,
      lng: longitude,
    });
  };

  // Page d'accueil Titre + Btn d'accès a la map
  return (
    <View style={styles.container}>
      <Text style={styles.title}>AroundMe</Text>
      <Button title="Activer ma position" onPress={getLocation} /> {/* appel la fontion getLocation */}
    </View>
  );
}

// Style simple
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 26,
    marginBottom: 20,
  },
});
