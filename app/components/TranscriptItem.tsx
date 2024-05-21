import * as React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const MOOD = [
  { mood: "Amazing", emoji: "😁" },
  { mood: "Good", emoji: "😁" },
  { mood: "Average", emoji: "🙃" },
  { mood: "Bad", emoji: "😔" },
  { mood: "Tough", emoji: "😢" },
  { mood: "Sad", emoji: "😢" },
];

const TranscriptItem = ({ item, onPress }) => {
  const { created_at, sentiment } = item;
  const matchedMood = MOOD.find((moodObj) => moodObj.mood === sentiment);
  return (
    <Pressable style={styles.messageContainer} onPress={() => onPress(item)}>
      <View style={styles.logContainer}>
        {/* <Text>
          {new Date(created_at).toLocaleString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Text> */}
        <Text>
          Feeling:
          {sentiment ? (matchedMood ? matchedMood.emoji : "N/A") : "N/A"}
        </Text>
      </View>
    </Pressable>
  );
};

export default TranscriptItem;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    // height: '100%',
    // display: 'flex',
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  logContainer: {
    display: "flex",
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
    width: "100%", // Ensures the message container takes full width of the screen
    marginBottom: 10,
    borderRadius: 10,
  },
  userMessage: {
    color: "blue",
    textAlign: "right",
    paddingVertical: 10,
    marginBottom: 10,
  },
  assistantMessage: {
    color: "green",
  },
});
