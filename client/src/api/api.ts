import axios from "axios";
import type { User } from "../types/model.types";

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const API_URL = BASE_URL + "/api/v1";

axios.defaults.baseURL = API_URL;
axios.defaults.headers.common["Content-Type"] = "application-json";

export const getProfile = async (userId: number): Promise<User> => {
  const { data: user } = await axios.get(`/profile/${userId}`);
  return user;
};
