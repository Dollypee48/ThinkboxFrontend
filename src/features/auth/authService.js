
import axios from "axios";

const API_BASE_URL="https://think-box-backend.vercel.app/api/auth"; 

const register = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/register`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(`${API_BASE_URL}/login`, userData);
  if (res.data) localStorage.setItem("user", JSON.stringify(res.data));
  return res.data;
};

const logout = () => localStorage.removeItem("user");

const authService = { register, login, logout };

export default authService;
