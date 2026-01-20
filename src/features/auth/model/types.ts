import type { User } from '@/entities/user';

export type { User };

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
