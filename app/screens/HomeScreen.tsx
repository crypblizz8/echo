import { Pressable, StyleSheet, Text, View } from "react-native";
import Vapi from "@vapi-ai/react-native";
import { useEffect } from "react";
import { ASSISTANT_ID, VAPI_PUBLIC_KEY } from "@env";

export default function HomeScreen() {
  let vapi: any = null;

  useEffect(() => {
    vapi = new Vapi(VAPI_PUBLIC_KEY);
  }, [vapi]);

  const handlePress = async () => {
    vapi.start(ASSISTANT_ID);
  };

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl">Vapi</Text>
      <Pressable
        className="bg-blue-500 p-2 mt-4 rounded-md"
        onPress={() => {
          handlePress();
        }}
      >
        <Text className="text-white">Press me</Text>
      </Pressable>
    </View>
  );
}
