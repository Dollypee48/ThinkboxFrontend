// src/pages/Login.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", showPassword: false });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.auth);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(login({
        email: form.email.trim(),
        password: form.password,
      }));
      if (login.fulfilled.match(resultAction)) navigate("/dashboard");
    } catch {}
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" required value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" />
          <input name="password" type={form.showPassword ? "text" : "password"} required value={form.password} onChange={handleChange} placeholder="Password" className="w-full border p-2 rounded" />
          <label className="flex items-center text-sm">
            <input type="checkbox" checked={form.showPassword} onChange={() => setForm({ ...form, showPassword: !form.showPassword })} className="mr-2" />
            Show Password
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
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
