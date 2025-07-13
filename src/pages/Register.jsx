import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const API_BASE_URL = "https://think-box-backend.vercel.app/api/auth";

export default function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    showPassword: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const togglePassword = () => setForm({ ...form, showPassword: !form.showPassword });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      email: form.email.trim(),
      password: form.password,
    };

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/register`, userData);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error("Register failed:", err);
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-purple-700 text-center mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="border p-2 rounded" />
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="border p-2 rounded" />
          </div>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full border p-2 rounded" />
          <input name="password" type={form.showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Password" required className="w-full border p-2 rounded" />
          <input name="confirmPassword" type={form.showPassword ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="w-full border p-2 rounded" />
          <label className="flex items-center text-sm">
            <input type="checkbox" checked={form.showPassword} onChange={togglePassword} className="mr-2" />
            Show Password
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
          <p className="text-sm text-center mt-4">Already have an account? <Link to="/login" className="text-purple-600">Login</Link></p>
        </form>
      </div>
    </div>
  );
}
