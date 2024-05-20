import { View, Text, Pressable } from "react-native";

export const Header = ({ navigation }: { navigation: any }) => {
  return (
    <Pressable
      className="flex-row justify-end items-end w-full border-1 mt-8"
      onPress={() => navigation.navigate("Settings")}
    >
      <Text style={{ fontSize: 30 }}>⚙️</Text>
    </Pressable>
  );
};
