import { StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import { useState, useEffect } from "react";
import { startVapi } from "../lib/vapi";
import SettingsScreen from "./screens/SettingsScreen";
import { TranscriptItemScreen } from "./screens/TranscriptItemScreen";
import Router from "./navigation/Router";
import LoadingScreen from "./screens/LoadingScreen";
import { AuthProvider, useAuth } from "./navigation/AuthContext";

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
      <AuthProvider>
        {vapiInitialized ? <Router /> : <LoadingScreen />}
      </AuthProvider>
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
