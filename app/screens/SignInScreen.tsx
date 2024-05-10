import * as AppleAuthentication from "expo-apple-authentication";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { supabase } from "../../lib/supabase";
import { AppleLogin } from "../components/AppleLogin";

const SignInScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Pressable className="mb-4" onPress={() => navigation.navigate("Home")}>
        <Text>Skip</Text>
      </Pressable>
      <AppleLogin navigation={navigation} />
    </View>
  );
};

export default SignInScreen;
