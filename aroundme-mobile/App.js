import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import ResultsScreen from "./screens/ResultsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "AroundMe" }}
        />
        <Stack.Screen
          name="Results"
          component={ResultsScreen}
          options={{ title: "Lieux à proximité" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
