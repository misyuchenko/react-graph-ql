export { default as LoginView } from "../../pages/login/LoginView";

export { useAuth } from "../../pages/login/useAuth";

export { default as authReducer } from "./model/authSlice";
export { setToken, setUser, clearAuth } from "./model/authSlice";
export {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
} from "./model/authSelectors";

export { authService } from "./api/auth.service";
export { useLoginMutation, useWhoAmIQuery, useLazyWhoAmIQuery } from "./api/authApi";

export type {
  User,
  LoginInput,
  LoginResponse,
  WhoAmIResponse,
} from "./model/types";
