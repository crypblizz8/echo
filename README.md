# RN AI BoilerPlate

Quick BoilerPlate to make RN / Expo AI Apps

# Stack

Auth + DB

- Supabase
- Expo Apple Authentication

Style

- NativeWind

State

- Async Storage (due to supabase)
- (mmkv)
- (Zustand)

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

---

## Installation

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```
