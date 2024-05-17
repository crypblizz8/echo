import Vapi from "@vapi-ai/react-native";
import { VAPI_PUBLIC_KEY, ASSISTANT_ID } from "@env";
export let vapi: any;

export const startVapi = async () => {
  vapi = new Vapi(VAPI_PUBLIC_KEY);
  console.log("Vapi", vapi);
};

export const startAssistant = async () => {
  try {
    console.log("Vapi started", VAPI_PUBLIC_KEY);
    await vapi.start(ASSISTANT_ID);
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
