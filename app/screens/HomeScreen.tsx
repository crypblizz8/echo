import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { EmptyStateText } from "../components/EmptyStateText";
import { RecordButton } from "../components/RecordButton";
import { RecordModal } from "./RecordModal";
import { Header } from "../components/Header";
import { getTranscripts } from "../../lib/supabase";
import { AuthContext } from "../navigation/AuthContext";
import TranscriptItem from "../components/TranscriptItem";
export default function HomeScreen({ navigation }: { navigation: any }) {
  const [loadingTranscripts, setLoadingTranscripts] = useState(false);
  const [visible, setVisible] = useState(false);
  const [transcripts, setTranscripts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getTranscripts(setTranscripts, setLoadingTranscripts);
  }, []);

  const refreshData = () => {
    setTranscripts([]); // Clear local state for update
    getTranscripts(setTranscripts, setLoadingTranscripts);
  };

  if (loadingTranscripts)
    return (
      <View className="flex-1 bg-F8F8F8 justify-center p-4">
        <ActivityIndicator size="large" color="#111111" />
      </View>
    );

  const groupByDate = (data) => {
    return data.reduce((acc, item) => {
      const date = new Date(item.created_at).toLocaleDateString([], {
        year: "numeric",
        month: "long",
        day: "2-digit",
      });

      if (!acc[date]) {
        acc[date] = [];
      }

      acc[date].push(item);

      return acc;
    }, {});
  };
  const groupedData = groupByDate(transcripts);

  const flattenedData = Object.keys(groupedData).map((date) => ({
    date,
    data: groupedData[date],
  }));

  const renderGroupedItem = ({ item }) => (
    <View>
      <Text className="text-bold text-lg my-2 ml-2">{item.date}</Text>
      {item.data.map((entry) => (
        <TranscriptItem
          key={entry.id}
          item={entry}
          onPress={(item) => navigation.navigate("Journal Entry", { item })}
        />
      ))}
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

          <FlatList
            className="mt-4"
            showsVerticalScrollIndicator={false}
            data={flattenedData}
            renderItem={renderGroupedItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
            }
          />
        </View>
      )}

      <RecordButton onPress={() => setVisible(true)} />
      <RecordModal
        isVisible={visible}
        onDismiss={() => setVisible(false)}
        onRefresh={refreshData}
        setVisible={setVisible}
      />
    </View>
  );
}
