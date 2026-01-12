export interface User {
  username: string;
}

export interface LoginInput {
  username: string;
  password: string;
}

export interface LoginResponse {
  signIn: {
    accessToken: string;
  };
}

export interface WhoAmIResponse {
  whoAmI: User;
}
