import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const ProblemContext = createContext();

const API_BASE_URL = "https://think-box-backend.vercel.app/api";

export const ProblemProvider = ({ children }) => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    return {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
  };

  // Fetch all problems
  const fetchProblems = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`${API_BASE_URL}/problems`, getAuthHeaders());
      setProblems(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch problems");
    } finally {
      setLoading(false);
    }
  };

  // Get a single problem by ID
  const getProblemById = async (id) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/problems`, getAuthHeaders());
      return res.data.find((p) => p._id === id);
    } catch (err) {
      console.error("Error fetching problem by ID:", err);
      return null;
    }
  };

  // Create a new problem
  const createProblem = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/problems`, formData, getAuthHeaders());
      setProblems((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Problem creation failed");
    } finally {
      setLoading(false);
    }
  };

  // Update an existing problem
  const updateProblem = async (id, formData) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/problems/${id}/edit`, formData, getAuthHeaders());
      setProblems((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      return res.data;
    } catch (err) {
      throw new Error("Update failed");
    }
  };

  // Delete a problem
  const deleteProblem = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/problems/${id}`, getAuthHeaders());
      setProblems((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Add note
  const addNoteToProblem = async (id, text) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/problems/${id}/notes`,
        { text },
        getAuthHeaders()
      );
      return res.data; // Updated notes array
    } catch (err) {
      throw new Error("Failed to add note");
    }
  };

  // Edit note
  const editNoteOnProblem = async (id, noteId, text) => {
    try {
      const res = await axios.put(
        `${API_BASE_URL}/problems/${id}/notes/${noteId}`,
        { text },
        getAuthHeaders()
      );
      return res.data; // Updated notes array
    } catch (err) {
      throw new Error("Failed to edit note");
    }
  };

  // Delete note
  const deleteNoteFromProblem = async (id, noteId) => {
    try {
      const res = await axios.delete(
        `${API_BASE_URL}/problems/${id}/notes/${noteId}`,
        getAuthHeaders()
      );
      return res.data; // Updated notes array
    } catch (err) {
      throw new Error("Failed to delete note");
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  return (
    <ProblemContext.Provider
      value={{
        problems,
        loading,
        error,
        fetchProblems,
        getProblemById,
        createProblem,
        updateProblem,
        deleteProblem,
        addNoteToProblem,
        editNoteOnProblem,
        deleteNoteFromProblem,
      }}
    >
      {children}
    </ProblemContext.Provider>
  );
};

export const useProblem = () => useContext(ProblemContext);
