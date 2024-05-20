import React from "react";
import { useAuth } from "./AuthContext";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SignInScreen from "../screens/SignInScreen";
import { TranscriptItemScreen } from "../screens/TranscriptItemScreen";
import LoadingScreen from "../screens/LoadingScreen";

const Stack = createNativeStackNavigator();

const Router = () => {
  const { authState, isLoadingAuth } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoadingAuth ? (
        <Stack.Screen name="Loading" component={LoadingScreen} />
      ) : (
        <>
          {authState.authenticated && authState.loggedIn && (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen
                name="Journal Entry"
                options={{ headerShown: true }}
                component={TranscriptItemScreen}
              />
              <Stack.Screen
                name="Settings"
                options={{ headerShown: true }}
                component={SettingsScreen}
              />
              <Stack.Screen name="SignIn" component={SignInScreen} />
            </>
          )}
          <Stack.Screen name="SignInMain" component={SignInScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default Router;
