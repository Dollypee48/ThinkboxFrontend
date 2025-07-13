import axios from "axios";

const API_URL = "http://localhost:5000/api/problems/";

// Get token from localStorage
const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.token;
};

// Create new problem
const createProblem = async (problemData) => {
  const token = getToken();
  const res = await axios.post(API_URL, problemData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

// Get all user problems
const getProblems = async () => {
  const token = getToken();
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

const problemService = {
  createProblem,
  getProblems,
};

export default problemService;
