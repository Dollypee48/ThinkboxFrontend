import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProblems } from "../features/problems/problemSlice";
import { Link } from "react-router-dom";
import UserLayout from "../layouts/UserLayout";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { problems = [], loading } = useSelector((state) => state.problems || {});

  useEffect(() => {
    dispatch(getProblems());
  }, [dispatch]);

  const totalProblems = problems.length;
  const notesCount = problems.filter(
    (p) => Array.isArray(p.notes) && p.notes.some((note) => note.text?.trim() !== "")
  ).length;

  return (
    <UserLayout>
      <div className="mb-10">
        <h2 className="text-3xl font-bold text-purple-700">Welcome, {user?.firstName} 👋</h2>
        <p className="text-gray-600 mt-2">
          Track and manage your problems with clarity and tools that work.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Stat title="Problems Submitted" value={totalProblems} icon="🧠" />
        <Stat title="Notes Added" value={notesCount} icon="📝" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card
          title="Submit a New Problem"
          description="Break down challenges with our powerful templates."
          buttonLabel="Submit Now"
          to="/submit"
        />
        <Card
          title="Manage Your Problems"
          description="Edit, organize, or export your problems."
          buttonLabel="Go to Problems"
          to="/problems"
        />
      </div>
    </UserLayout>
  );
}
