import React, { useEffect, useState } from "react";
import { View, SafeAreaView, StyleSheet, Text, Button } from "react-native";
import { supabase } from "../../lib/supabase";
import { useAuth } from "../navigation/AuthContext";

const SettingsScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState("");
  const { updateAuthState } = useAuth();

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setEmail("");
      navigation.navigate("SignIn");
      updateAuthState({ authenticated: false, user: null, loggedIn: false });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getAuthenticatedUser() {
      const { data, error } = await supabase.auth.getUser();
      // console.log('user', data.user.email);
      if (error) {
        console.error(error);
      } else {
        setEmail(data.user.email);
      }
    }
    getAuthenticatedUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 18 }}>Email:</Text>
          <Text>{email}</Text>
        </View>
        <Button title="Sign Out" onPress={() => handleSignOut()} />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",

    flex: 1,
  },
  pickerContainer: {
    display: "flex",
    borderWidth: 1 /* Make the picker container take up the full width */,
  },
  picker: {
    maxHeight: 200 /* Keep the height as you want */,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "grey",
  },
});
