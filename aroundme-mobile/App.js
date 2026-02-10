import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import des écrans
import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Définition des écrans */}
      <Stack.Navigator>
        {/* Ecran d'accueil */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "AroundMe" }}
        />
        {/* Ecran avec la map (filtre...) */}
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: "Lieux à proximité" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
