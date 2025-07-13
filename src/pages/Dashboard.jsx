// src/pages/Dashboard.jsx
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { getProblems } from "../features/problems/problemSlice";
import UserLayout from "../layouts/UserLayout";

export default function Dashboard() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { problems = [] } = useSelector((state) => state.problems);

  useEffect(() => {
    dispatch(getProblems());
  }, [dispatch]);

  const total = problems.length;
  const notes = problems.filter((p) => p.notes?.some((n) => n.text?.trim())).length;

  return (
    <UserLayout>
      <h2 className="text-2xl font-bold text-purple-700 mb-4">Welcome, {user?.firstName}</h2>
      <p className="text-gray-600 mb-6">Here's a snapshot of your progress.</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white shadow rounded p-4">Problems: {total}</div>
        <div className="bg-white shadow rounded p-4">Notes: {notes}</div>
      </div>
    </UserLayout>
  );
}
