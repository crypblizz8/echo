import * as React from "react";
import { View, Pressable, Text, StyleSheet, ScrollView } from "react-native";

export const TranscriptItemScreen = ({ route }: any) => {
  const { transcript } = route.params.item;

  if (transcript.length === 0) {
    return (
      <View style={styles.container}>
        <Text>The log is empty.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        {transcript.map((transcript: any, index: any) => {
          const { role, content } = transcript;
          return (
            <View
              key={index}
              style={[
                styles.messageContainer,
                role === "user"
                  ? styles.userMessageContainer
                  : styles.assistantMessageContainer,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  role === "user"
                    ? styles.userMessageText
                    : styles.assistantMessageText,
                ]}
              >
                {content}
              </Text>
            </View>
          );
        })}
      </ScrollView>

      {/* <View className="border h-1/5">
        <Pressable
          onPress={() => console.log("Generate summary")}
          className="bg-orange-500 p-2 rounded-lg w-1/2 items-center justify-center"
        >
          <Text className="text-white font-bold">Generate AI summary</Text>
        </Pressable>
        <Text>Echo thinks:</Text>
        <Text>You might be feeling down today</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: "#F7F7F7",
  },
  messageContainer: {
    maxWidth: "70%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginBottom: 10,
  },
  userMessageContainer: {
    backgroundColor: "#007AFF",
    alignSelf: "flex-end",
  },
  assistantMessageContainer: {
    backgroundColor: "#b4b4bc",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
  userMessageText: {
    textAlign: "right",
  },
  assistantMessageText: {
    textAlign: "left",
  },
});
