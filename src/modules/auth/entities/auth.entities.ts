import { Role } from "@/services/app/abilities";

export type UserLogin = {
  username: string;
  password: string;
};

export type AuthResponse = {
  token: string;
  user: User;
  roles: Role[];
};

export type UserLoginResponse = {
  token: AuthResponse;
};
export type GetMeResponse = {
  me: AuthResponse;
};

export type User = {
  id: string;
  name: string;
};
