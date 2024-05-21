import Groq from "groq-sdk";
import { GROQ_KEY } from "@env";
// Replace with your actual Groq API key (store securely)
export let groq: any;

groq = new Groq({
  apiKey: GROQ_KEY,
});

// console.log("GROQ_KEY", groq);

export async function getGroqChatCompletion(
  message: string,
  model = "llama3-8b-8192"
): Promise<string | undefined> {
  try {
    // console.log("getGroqChatCompletion PROMPT message", message);
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      model,
    });
    // console.log(
    //   "chatCompletion",
    //   chatCompletion.choices?.[0]?.message?.content
    // );
    return chatCompletion.choices?.[0]?.message?.content;
  } catch (error) {
    console.error("Error fetching chat completion:", error);
    return undefined;
  }
}
