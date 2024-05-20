import {
  View,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { EmptyStateText } from "../components/EmptyStateText";
import { RecordButton } from "../components/RecordButton";
import { RecordModal } from "./RecordModal";
import { Header } from "../components/Header";
import { getTranscripts } from "../../lib/supabase";
import Transcripts from "../components/Transcripts";
import { AuthContext } from "../navigation/AuthContext";

export default function HomeScreen({ navigation }: { navigation: any }) {
  const [loadingTranscripts, setLoadingTranscripts] = useState(false);
  const [visible, setVisible] = useState(false);
  const [transcripts, setTranscripts] = useState([]);

  const { authState } = useContext(AuthContext);
  // console.log("authState", authState?.loggedIn);

  useEffect(() => {
    getTranscripts(setTranscripts, setLoadingTranscripts);
  }, []);

  if (loadingTranscripts)
    return (
      <View className="flex-1 bg-F8F8F8 justify-center p-4">
        <ActivityIndicator size="large" color="#111111" />
      </View>
    );

  return (
    <View className="flex-1 bg-F8F8F8 p-4">
      <Header navigation={navigation} />
      {transcripts && transcripts.length === 0 ? (
        <View className="flex-1 justify-center">
          <EmptyStateText />
        </View>
      ) : (
        <View className="flex-1">
          <Text className="text-3xl font-semi" style={{ color: "#111111" }}>
            Entries
          </Text>
          <Transcripts transcripts={transcripts} navigation={navigation} />
        </View>
      )}

      <RecordButton onPress={() => setVisible(true)} />
      <RecordModal isVisible={visible} onDismiss={() => setVisible(false)} />
    </View>
  );
}
