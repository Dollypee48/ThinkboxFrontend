
import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://think-box-backend.vercel.app/api/auth/";
const API_URL = BASE_URL.endsWith("/") ? BASE_URL : BASE_URL + "/";

// Register user
const register = async (userData) => {
  const res = await axios.post(`${API_URL}register`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

// Login user
const login = async (userData) => {
  const res = await axios.post(`${API_URL}login`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  login,
  logout,
};

export default authService;
