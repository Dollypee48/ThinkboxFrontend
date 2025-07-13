import axios from "axios";


const BASE = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") || "https://think-box-backend.vercel.app/api/auth";

const register = async (userData) => {
  const res = await axios.post(`${BASE}/register`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${BASE}/login`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = () => localStorage.removeItem("user");

const authService = { register, login, logout };

export default authService;
