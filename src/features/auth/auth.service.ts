import { config } from "@/config";

export const authService = {
  setToken(token: string): void {
    localStorage.setItem(config.authKey, token);
  },

  getToken(): string | null {
    return localStorage.getItem(config.authKey);
  },

  removeToken(): void {
    // localStorage.removeItem(TOKEN_KEY);
  },

  clear(): void {
    this.removeToken();
  },

  hasToken(): boolean {
    return !!this.getToken();
  },
};
