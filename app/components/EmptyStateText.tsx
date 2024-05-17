import { View, Text } from "react-native";

export const EmptyStateText = () => {
  return (
    <View>
      <Text className="text-3xl font-semi" style={{ color: "#111111" }}>
        Let's get started!
      </Text>
      <Text className="text-xl" style={{ color: "#8E8F94" }}>
        Echo is here to help you reflect.
      </Text>
      <Text className="text-xl" style={{ color: "#8E8F94" }}>
        Record your first entry.
      </Text>
    </View>
  );
};
