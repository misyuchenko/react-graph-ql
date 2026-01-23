export { useAuth } from "./hooks/useAuth";

export { default as authReducer } from "./model/authSlice";
export { setToken, setUser, clearAuth } from "./model/authSlice";
export {
  selectAuth,
  selectUser,
  selectIsAuthenticated,
} from "./model/authSelectors";

export { authService } from "./api/auth.service";
export {
  useSignInMutation,
  useWhoAmIQuery,
  useLazyWhoAmIQuery,
} from "@/shared/api/generated/enhanced-api";

export type {
  User,
  LoginInput,
  LoginResponse,
  WhoAmIResponse,
} from "./model/types";
