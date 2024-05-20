import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@env";

const supabaseUrl = SUPABASE_URL;
const supabaseAnonKey = SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

export const uploadTranscript = async (transcript: any) => {
  console.log("Uploading transcript:", transcript);

  const { data, error } = await supabase.from("transcripts").insert([
    {
      transcript: transcript,
    },
  ]);

  if (error) {
    console.error("Error uploading JSON object:", error);
  } else {
    console.log("Successfully uploaded JSON object:", data);
  }
  // const response = await vapi.uploadSupabase();
};

export const getTranscripts = async (setTranscripts, setLoadingTranscripts) => {
  setLoadingTranscripts(true)
  const { data, error } = await supabase
    .from("transcripts")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Error fetching transcripts:", error);
  } else {
    console.log("Successfully fetched transcripts:", data);
    setTranscripts(data);
    setLoadingTranscripts(false)
    return data;
  }
};
