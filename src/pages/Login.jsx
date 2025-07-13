import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", showPassword: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const togglePassword = () => setForm({ ...form, showPassword: !form.showPassword });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/login`, {
        email: form.email.trim(),
        password: form.password,
      });
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-2">Welcome Back 👋</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full border p-2 rounded" />
          <input name="password" type={form.showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Password" required className="w-full border p-2 rounded" />
          <label className="flex items-center text-sm">
            <input type="checkbox" checked={form.showPassword} onChange={togglePassword} className="mr-2" />
            Show Password
          </label>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <p className="text-sm text-center mt-4">
            Don’t have an account? <Link to="/register" className="text-purple-600">Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
