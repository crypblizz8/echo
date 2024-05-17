import { View, Text, StyleSheet, Pressable } from "react-native";
import { AppleLogin } from "../components/AppleLogin";

const SignInScreen = ({ navigation }: { navigation: any }) => {
  return (
    <View className="flex-1 items-center justify-center bg-F8F8F8">
      <View className="flex-1 h-4/5 justify-center items-start w-full p-8 mt-16">
        <Text className="text-6xl font-semi" style={{ color: "#111111" }}>
          Echo
        </Text>
        <Text className="text-xl" style={{ color: "#8E8F94" }}>
          Your friendly journal assistant
        </Text>
      </View>
      <View className="h-1/5 justify-center item-center ">
        <Pressable className="mb-4" onPress={() => navigation.navigate("Home")}>
          <Text> Skip</Text>
        </Pressable>
        <AppleLogin navigation={navigation} />
      </View>
    </View>
  );
};

export default SignInScreen;
