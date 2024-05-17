import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "../../lib/supabase";
import { StyleSheet } from "react-native";

export const AppleLogin = ({ navigation }: { navigation: any }) => {
  return (
    <AppleAuthentication.AppleAuthenticationButton
      buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
      buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
      cornerRadius={5}
      style={styles.button}
      onPress={async () => {
        try {
          const credential = await AppleAuthentication.signInAsync({
            requestedScopes: [
              AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
              AppleAuthentication.AppleAuthenticationScope.EMAIL,
            ],
          });
          // console.log(JSON.stringify(credential, null, 2));
          // Sign in via Supabase Auth.
          if (credential.identityToken) {
            const {
              data: { user },
              error,
            } = await supabase.auth.signInWithIdToken({
              provider: "apple",
              token: credential.identityToken,
            });

            // console.log(JSON.stringify({ error, user }, null, 2));
            if (!error) {
              navigation.navigate("Home");
              return;
              // User is signed in.
            }
          } else {
            throw new Error("No identityToken.");
          }
        } catch (e: any) {
          if (e.code === "ERR_REQUEST_CANCELED") {
            // handle that the user canceled the sign-in flow
          } else {
            // console.log("Error SIGNING in", e);
            // handle other errors
          }
        }
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    width: 250,
    height: 50,
  },
});
