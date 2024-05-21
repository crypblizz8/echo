import { Text, View, FlatList, StyleSheet, RefreshControl } from "react-native";
import TranscriptItem from "./TranscriptItem";
import React, { useState } from "react";

export const Transcripts = ({
  transcripts,
  navigation,
  setLoadingTranscripts,
}) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // setLoadingTranscripts(true);
    setRefreshing(false);
  };

  const groupedData = groupByDate(transcripts);

 const renderGroupedItem = ({ item }) => (
    <View>
      <Text style={styles.dateHeader}>{item.date}</Text>
      {item.data.map((entry) => (
        <TranscriptItem
          key={entry.id}
          item={entry}
          onPress={(item) => navigation.navigate("Journal Entry", { item })}
        />
      ))}
    </View>
  );

  const flattenedData = Object.keys(groupedData).map((date) => ({
    date,
    data: groupedData[date],
  }));

  return (
    <FlatList
      className="mt-4"
      showsVerticalScrollIndicator={false}
      data={flattenedData}
      renderItem={renderGroupedItem}
      keyExtractor={(item, index) => index.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

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

export default Transcripts;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  logContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexGrow: 1,
    height: 50,
    paddingHorizontal: 16,
  },
  messageContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    marginBottom: 10,
    borderRadius: 10,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    marginLeft: 10,
  },
});
