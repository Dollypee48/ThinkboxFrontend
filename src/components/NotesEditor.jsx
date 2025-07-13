import { useState } from "react";
import axios from "axios";

const API_BASE_URL = "https://think-box-backend.vercel.app";

export default function NotesEditor({ problemId, initialNotes = "" }) {
  const [notes, setNotes] = useState(initialNotes);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const handleSave = async () => {
    try {
      setSaving(true);
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.put(
        `${API_BASE_URL}/api/problems/${problemId}/notes`,
        { notes },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setStatus("Notes saved successfully.");
    } catch (err) {
      console.error("Error saving notes:", err);
      setStatus("Failed to save notes.");
    } finally {
      setSaving(false);
      setTimeout(() => setStatus(""), 3000);
    }
  };

  return (
    <div className="bg-white p-6 shadow rounded space-y-4">
      <h3 className="text-xl font-semibold text-purple-700">Your Notes</h3>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={6}
        className="w-full border p-3 rounded"
        placeholder="Write additional insights or thoughts here..."
      />
      <button
        onClick={handleSave}
        disabled={saving}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
      >
        {saving ? "Saving..." : "Save Notes"}
      </button>
      {status && <p className="text-sm text-gray-500">{status}</p>}
    </div>
  );
}
