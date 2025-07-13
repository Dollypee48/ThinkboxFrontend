// src/pages/Register.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "", showPassword: false });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }
    try {
      const result = await dispatch(register({
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        password: form.password,
      }));
      if (register.fulfilled.match(result)) navigate("/dashboard");
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="border p-2 rounded" />
            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="border p-2 rounded" />
          </div>
          <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" required className="w-full border p-2 rounded" />
          <input name="password" type={form.showPassword ? "text" : "password"} value={form.password} onChange={handleChange} placeholder="Password" required className="w-full border p-2 rounded" />
          <input name="confirmPassword" type={form.showPassword ? "text" : "password"} value={form.confirmPassword} onChange={handleChange} placeholder="Confirm Password" required className="w-full border p-2 rounded" />
          <label className="flex items-center text-sm">
            <input type="checkbox" checked={form.showPassword} onChange={() => setForm({ ...form, showPassword: !form.showPassword })} className="mr-2" />
            Show Password
          </label>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">Register</button>
          <p className="text-sm text-center mt-4">
            Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
