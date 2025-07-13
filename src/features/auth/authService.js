
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "https://think-box-backend.vercel.app/api/auth";

const register = async (userData) => {
  const res = await axios.post(`${BASE_URL}/register`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${BASE_URL}/login`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = () => localStorage.removeItem("user");

const authService = { register, login, logout };

export default authService;
