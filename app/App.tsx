import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import { useState, useEffect } from "react";
import { startVapi } from "../lib/vapi";

const Stack = createNativeStackNavigator();

function App() {
  const [vapiInitialized, setVapiInitialized] = useState(false);

  useEffect(() => {
    startVapi().then(() => {
      setVapiInitialized(true);
      console.log("Vapi initialized");
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

registerRootComponent(App);
