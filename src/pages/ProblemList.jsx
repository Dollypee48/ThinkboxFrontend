import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProblems } from "../features/problems/problemSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = "https://think-box-backend.vercel.app";

export default function ProblemList() {
  const dispatch = useDispatch();
  const { problems, loading, error } = useSelector((state) => state.problems);

  useEffect(() => {
    dispatch(getProblems());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`${API_BASE_URL}/api/problems/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      dispatch(getProblems());
    } catch (err) {
      console.error("Failed to delete:", err);
      alert("Could not delete problem. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-purple-700">📋 Your Problems</h2>
        <p className="text-gray-600 mt-2">View, edit, or remove your submitted problems.</p>
      </div>

      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && problems.length === 0 && (
        <div className="text-center mt-10">
          <p className="text-gray-500">You haven’t submitted any problems yet.</p>
          <Link
            to="/submit"
            className="mt-4 inline-block bg-purple-600 text-white px-5 py-2 rounded hover:bg-purple-700 transition"
          >
            Submit a Problem
          </Link>
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {problems.map((problem) => (
          <div
            key={problem._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold text-purple-800 mb-1">
              {problem.title}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              <strong>Category:</strong> {problem.category}
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {problem.description
                ? problem.description.slice(0, 100) + "..."
                : "No description provided."}
            </p>
            <p className="text-xs text-gray-400 mb-4">
              Submitted: {new Date(problem.createdAt).toLocaleDateString()}
            </p>
            <div className="flex justify-between items-center">
              <Link
                to={`/problems/${problem._id}`}
                className="text-blue-600 text-sm font-medium hover:underline"
              >
                View
              </Link>
              <button
                onClick={() => handleDelete(problem._id)}
                className="text-red-600 text-sm font-medium hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
