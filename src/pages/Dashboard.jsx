import { useProblems } from "../context/ProblemContext";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

export default function Dashboard() {
  const { user } = useAuth();
  const { problems, loading, fetchProblems } = useProblems();

  useEffect(() => {
    fetchProblems();
  }, []);

  const totalProblems = problems.length;
  const notesCount = problems.filter(
    (p) => Array.isArray(p.notes) && p.notes.some((note) => note.text?.trim() !== "")
  ).length;

  return (
    <UserLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-purple-700">Welcome, {user?.firstName} 👋</h2>
        <p className="text-gray-600 mt-2">Track and manage your problems with clarity.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Stat title="Problems Submitted" value={totalProblems} icon="🧠" />
        <Stat title="Notes Added" value={notesCount} icon="📝" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title="Submit a New Problem" description="Break down challenges." buttonLabel="Submit Now" to="/submit" />
        <Card title="Manage Your Problems" description="Organize or export your problems." buttonLabel="Go to Problems" to="/problems" />
      </div>
    </UserLayout>
  );
}

function Stat({ title, value, icon }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow text-center hover:shadow-md transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      <p className="text-2xl font-bold text-purple-700">{value}</p>
    </div>
  );
}

function Card({ title, description, buttonLabel, to }) {
  return (
    <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-semibold text-purple-700 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
      <div className="mt-4">
        <Link to={to} className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded">
          {buttonLabel}
        </Link>
      </div>
    </div>
  );
}
