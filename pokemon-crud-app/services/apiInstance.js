import axios from "axios";
import { TOKEN_NAME } from "../src/context/auth.context";

const apiInstace = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}`
});

apiInstace.interceptors.request.use(config => {
  const token = localStorage.getItem(TOKEN_NAME);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default apiInstace;