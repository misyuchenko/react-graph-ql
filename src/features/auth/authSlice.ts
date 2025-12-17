import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "./auth.types";

const TOKEN_KEY = "auth_token";

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const getTokenFromStorage = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

const initialState: AuthState = {
  token: getTokenFromStorage(),
  user: null,
  isAuthenticated: !!getTokenFromStorage(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem(TOKEN_KEY, action.payload);
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      // localStorage.removeItem(TOKEN_KEY);
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
