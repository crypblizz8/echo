import Vapi from "@vapi-ai/react-native";
import { EXPO_PUBLIC_ASSISTANT_ID, EXPO_PUBLIC_VAPI_PUBLIC_KEY } from "@env";
export let vapi: any;

export const startVapi = async () => {
  vapi = new Vapi(EXPO_PUBLIC_VAPI_PUBLIC_KEY);
  // console.log("Vapi", vapi);
};

export const startAssistant = async () => {
  try {
    // console.log("Vapi started", VAPI_PUBLIC_KEY);
    await vapi.start(EXPO_PUBLIC_ASSISTANT_ID);
    console.log("Started assistant successfully.");
  } catch (error) {
    console.log("error starting assistant", error);
    console.log("------");
  }
};

export const stopAssistant = async () => {
  try {
    vapi.stop();
    console.log("Assistant stopped successfully.");
  } catch (error) {
    console.log("error stopping assistant", error);
    console.log("------");
  }
};
