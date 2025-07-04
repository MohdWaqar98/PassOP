import axios from "axios";

const instance = axios.create({
  baseURL: "https://passop-backend-jx8n.onrender.com/api",
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
