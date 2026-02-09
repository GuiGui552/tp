import { View, Text, Button, StyleSheet, Alert } from "react-native";
import * as Location from "expo-location";

export default function HomeScreen({ navigation }) {
  const getLocation = async () => {
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
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AroundMe</Text>
      <Button title="Activer ma position" onPress={getLocation} />
    </View>
  );
}

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
