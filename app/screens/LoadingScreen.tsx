import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>Loading...</Text> */}
      <ActivityIndicator size="large" color="grey" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default LoadingScreen;
