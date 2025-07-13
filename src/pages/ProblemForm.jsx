import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProblem } from "../features/problems/problemSlice";
import { useNavigate } from "react-router-dom";

export default function ProblemForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.problems);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Personal",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return alert("Title is required");

    try {
      await dispatch(createProblem(form)).unwrap();
      setSuccessMessage("✅ Problem submitted successfully!");
      setForm({ title: "", description: "", category: "Personal" });

      // Optional delay before navigating to problems list
      setTimeout(() => {
        navigate("/problems");
      }, 1200);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-purple-700 mb-2">🧠 Submit a Problem</h2>
        <p className="text-gray-600 mb-6">
          Got a challenge? Share it with ThinkBox and explore structured solutions with notes, tools, and exports.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Problem Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              value={form.title}
              onChange={handleChange}
              disabled={loading}
              placeholder="E.g. How to increase customer retention?"
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              disabled={loading}
              placeholder="Add more context or ideas here..."
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={form.category}
              onChange={handleChange}
              disabled={loading}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="Personal">Personal</option>
              <option value="Academic">Academic</option>
              <option value="Business">Business</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Error Message */}
          {error && <p className="text-sm text-red-600">{error}</p>}

          {/* Success Message */}
          {successMessage && (
            <p className="text-sm text-green-600 font-medium">{successMessage}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-md transition duration-200"
          >
            {loading ? "Submitting..." : "Submit Problem"}
          </button>
        </form>
      </div>
    </div>
  );
}
