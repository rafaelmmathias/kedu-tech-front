import {
  AuthResponse,
  GetMeResponse,
  UserLogin,
  UserLoginResponse,
} from "@/modules/auth";
import { gqlRequest } from "@/services/infra";
import { loginMutation, getMeQuery } from "./login";

export type GetMeParams = {
  token: string;
};

type Login = (login: UserLogin) => Promise<AuthResponse>;
type LoginRequest = { login: UserLogin };
export const login: Login = async (login: UserLogin) => {
  const { token } = await gqlRequest<UserLoginResponse, LoginRequest>(
    loginMutation,
    {
      login,
    },
  );

  return token;
};

type GetMe = () => Promise<AuthResponse>;
export const getMe: GetMe = async () => {
  const { me } = await gqlRequest<GetMeResponse>(getMeQuery);
  return me;
};
