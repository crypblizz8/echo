import { View } from "react-native";
import Vapi from "@vapi-ai/react-native";
import { useEffect, useState } from "react";
import { ASSISTANT_ID, VAPI_PUBLIC_KEY } from "@env";
import { EmptyStateText } from "../components/EmptyStateText";
import { RecordButton } from "../components/RecordButton";
import { RecordModal } from "./RecordModal";

export default function HomeScreen() {
  let vapi: any = null;
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    vapi = new Vapi(VAPI_PUBLIC_KEY);
  }, [vapi]);

  const handlePress = async () => {
    vapi.start(ASSISTANT_ID);
  };

  return (
    <View className="flex-1 items-center justify-center bg-F8F8F8">
      <EmptyStateText />
      <RecordButton onPress={() => setVisible(true)} />
      <RecordModal isVisible={visible} onDismiss={() => setVisible(false)} />
    </View>
  );
}
