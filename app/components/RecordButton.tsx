import { Pressable, Text } from "react-native";

interface RecordButtonProps {
  onPress: () => void;
}

export const RecordButton = ({ onPress }: RecordButtonProps) => {
  return (
    <Pressable
      style={{
        position: "absolute",
        bottom: 20,
        right: 20,
        backgroundColor: "#FF5500",
        height: 80,
        width: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
      }}
      onPress={() => onPress()}
    >
      <Text className="text-white text-5xl">+</Text>
    </Pressable>
  );
};
