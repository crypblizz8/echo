import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import { SwipeIndicator } from "../components/SwipeIndicator";
import { useCallback, useEffect, useState } from "react";
import { startAssistant, stopAssistant, vapi } from "../../lib/vapi";
import LottieView from "lottie-react-native";
import { uploadTranscript } from "../../lib/supabase";

const HALF_HEIGHT = Dimensions.get("window").height / 2;

export const RecordModal = ({
  isVisible,
  onDismiss,
}: {
  isVisible: boolean;
  onDismiss: () => void;
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [conversation, setConversation] = useState([]);
  const [liveScript, setLiveScript] = useState("");

  useEffect(() => {
    console.log("isListening:", isListening);
  }, [isListening]);

  useEffect(() => {
    vapi.on("message", handleMessage);
    // vapi.on("call-start", () => {
    //   console.log("Call has started...");
    // });
    return () => {
      vapi.off("message", handleMessage);
    };
  }, []);

  const handleMessage = (message: any) => {
    if (message.type === "conversation-update") {
      console.log("converation", message.conversation);
      setConversation(message.conversation);
      const lastSentence =
        message.conversation[message.conversation.length - 1].content;
      setLiveScript(lastSentence);
    }
  };

  const toggle = useCallback(async () => {
    setIsListening(!isListening);
    if (isListening) {
      try {
        setLiveScript("");
        const hasContents = conversation.every((item) => item.content !== "");

        if (hasContents && conversation.length > 0) {
          console.log("conversation:", conversation);
          await uploadTranscript(conversation);
          console.log("testing uploading...");
        }
        // await stopAssistant();
      } catch (error) {
        console.error("Error stopping assistant:", error);
      }
    } else {
      try {
        // await startAssistant();
        setIsLoading(true);
        setTimeout(() => {
          setIsLoading(false);
        }, 5000);
      } catch (error) {
        console.error("Error starting assistant:", error);
      }
    }
  }, [isListening]);

  const handleCloseModal = () => {
    onDismiss();
  };

  const initialState = () => {
    return <Text style={styles.pressTalk}>Press to chat to Echo</Text>;
  };

  const loadingState = () => {
    return <Text style={styles.pressTalk}> Loading Echo...</Text>;
  };

  const listeningState = () => {
    return <Text style={styles.pressTalk}>I'm all ears</Text>;
  };

  return (
    <Modal
      isVisible={isVisible}
      swipeDirection="down"
      onSwipeComplete={handleCloseModal}
      style={{ margin: 0 }}
    >
      <View className="flex-1 justify-end">
        <View className="h-4/5 bg-white p-4 rounded-t-3xl">
          <SwipeIndicator />
          <View className="flex-1 justify-center items-center mb-10">
            {!isListening && !isLoading && initialState()}
            {isLoading && loadingState()}
            {!isLoading && isListening && listeningState()}

            <TouchableOpacity
              disabled={isLoading}
              onPress={async () => await toggle()}
              style={styles.container}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="black" />
              ) : (
                <Text style={styles.microphone}>🎙️</Text>
              )}
            </TouchableOpacity>
            {!isLoading && isListening && (
              <>
                <LottieView
                  source={require("../../assets/ring.json")}
                  style={styles.lottieContainer}
                  autoPlay
                  loop
                />
              </>
            )}

            {liveScript && (
              <View style={styles.liveScriptContainer}>
                <Text style={styles.liveScriptText}>{liveScript}</Text>
              </View>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  fakeModal: {
    height: "20%",
    width: "100%",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    backgroundColor: "pink",
  },
  twentyContainer: {
    height: "5%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    // borderWidth: 1,
  },

  eightyContainer: {
    height: "80%",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: "25%",
  },
  tapToChat: {
    marginBottom: 24,
    fontSize: 24,
  },
  container: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  firstCircle: {
    position: "absolute",
    top: -50,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  secondCircle: {
    position: "absolute",
    top: -85,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  thirdCircle: {
    position: "absolute",
    top: -130,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  microphone: {
    fontSize: 40,
    fontWeight: "bold",
    color: "black",
  },
  header: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 8,
  },
  settingsCircle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#C3C4C9",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  settingsIcon: {
    fontSize: 24,
  },
  swipeIndicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "grey",
    height: 5,
    width: 50,
    position: "relative",
    top: 15,
    left: "43%",
    zIndex: 1,
    borderRadius: 5,
  },
  pressTalk: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 20,
  },
  liveScriptContainer: {
    backgroundColor: "#48403e",
    padding: 10,
    borderRadius: 4,
    position: "absolute",
    bottom: 0,
    width: "80%",
  },
  liveScriptText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
    // fontWeight: 'bold',
  },
  lottieContainer: {
    width: HALF_HEIGHT,
    height: HALF_HEIGHT,
    zIndex: -1,
    position: "absolute",
    top: "53%",
    left: "50%",
    transform: [
      { translateX: -HALF_HEIGHT / 2 },
      { translateY: -HALF_HEIGHT / 2 },
    ],
  },
});
