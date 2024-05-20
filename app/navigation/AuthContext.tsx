import React, { useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Import AsyncStorage

const STORAGE_KEY = "authState";

export const AuthContext = React.createContext({
  authState: { authenticated: false, user: null, loggedIn: false },
  updateAuthState: (newAuthState: any) => {}, // Add this line
  isLoadingAuth: true,
});

export const AuthProvider = ({ children }: any) => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  const [authState, setAuthState] = useState({
    authenticated: false,
    user: null,
    loggedIn: false,
  });

  useEffect(() => {
    const retrieveAuthState = async () => {
      const storedAuthState = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedAuthState) {
        setAuthState(JSON.parse(storedAuthState));
      }
      setIsLoadingAuth(false);
    };

    retrieveAuthState();
  }, []);

  const updateAuthState = (newAuthState: any) => {
    setAuthState(newAuthState);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newAuthState)); // Use AsyncStorage.setItem
  };

  return (
    <AuthContext.Provider value={{ authState, updateAuthState, isLoadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
