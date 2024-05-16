import { View, Text, StyleSheet, Pressable } from "react-native";
import { AppleLogin } from "../components/AppleLogin";

const SignInScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Pressable className="mb-4" onPress={() => navigation.navigate("Home")}>
        <Text>Skipsdsdds</Text>
      </Pressable>
      <AppleLogin navigation={navigation} />
    </View>
  );
};

export default SignInScreen;
