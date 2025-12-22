import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../model/types";
import { config } from "@/shared/api/config";
import { authService } from "../api/auth.service";
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: authService.hasToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      localStorage.setItem(config.authKey, action.payload);
      state.isAuthenticated = true;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem(config.authKey);
    },
  },
});

export const { setToken, setUser, clearAuth } = authSlice.actions;
export default authSlice.reducer;
