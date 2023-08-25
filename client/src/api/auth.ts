import axios from "axios";

import type { UserLoginData, UserRegisterData } from "../types/auth.types";

import { selectToken, update } from "../features/token/tokenSlice";
import store from "../app/store";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const AUTH_URL = BASE_URL + "/auth";

axios.defaults.baseURL = AUTH_URL;
axios.defaults.headers.common["Content-Type"] = "application-json";

export const login = async (userData: UserLoginData) : Promise<void> => {
  const { data } = await axios.post(
    "/login",
    {
      ...userData,
    }
  );
  const { token } = data;
  store.dispatch(update(token));
};

export const register = async (userData: UserRegisterData) : Promise<void> => {
  await axios.post(
    "/register",
    {
      ...userData,
    }
  );
};

export const logout = async (userId: number) : Promise<void> => {
    const token = selectToken(store.getState());
  
    await axios.post(
    `/logout/${userId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
