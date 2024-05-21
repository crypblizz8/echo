# Echo AI

Your friendly AI mood journal.
Vapi AI Hackathon Submission.

# Stack

AI Voice Stack

- Vapi: React Native SDK
  `"@vapi-ai/react-native": "^0.1.7",`
- Daily: React Native SDK
  `"@daily-co/react-native-daily-js": "0.61.0",`
  `"@daily-co/react-native-webrtc": "118.0.3-daily.1",`
- Deepagram: voice API for the agent
- Groq: Mood Stiment Analysis
  ` "groq-sdk": "^0.3.3",`
  ` model = "llama3-8b-8192"`

Auth + DB

- Supabase
- Expo Apple Authentication

Style

- NativeWind

State

- Async Storage (due to supabase)

Navigation

- React Navigation

ENVS

- react dot env

# Prerequisites

## Supabase

- Create new project
- Get SUPABASE_URL and SUPABASE_ANON_KEY
- Then watch this YT tutorial (https://www.youtube.com/watch?v=6I2JEky20ME) You will need an Apple Dev Account
- On Dashboard --> Project Settings --> Authentication (https://supabase.com/dashboard/project/_/auth/providers)
- With `Authorized Client IDs`, add `iOS, host.exp.Exponent` because Expo needs authorization

## ENVS

- Reference env.example
- Add into env

## Note

Commits from 2 weeks ago was making a boilerplate for Expo + Apple Sign in + Supabase.

---

## Installation

1. Install dependencies

   ```bash
   npm install
   npx expo prebuild
   // Check pods have installed
   ```

2. Start the app

   ```bash
    npx expo run:ios
   ```
