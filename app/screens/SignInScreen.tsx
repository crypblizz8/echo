import { StatusBar } from "expo-status-bar";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { registerRootComponent } from "expo";

export default function SignInScreen({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      {/* <Text>SIGN IN</Text> */}
      <Pressable onPress={() => navigation.navigate("Home")}>
        <Text>Sign in B</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
