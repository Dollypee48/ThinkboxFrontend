import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ExportPDF from "../components/ExportPDF";

const API_BASE_URL = "https://think-box-backend.vercel.app";

export default function ProblemDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const endOfNotesRef = useRef(null);

  const [problem, setProblem] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    category: "Personal",
  });
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const res = await axios.get(`${API_BASE_URL}/api/problems`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        const found = res.data.find((p) => p._id === id);
        if (!found) return setProblem(null);
        setProblem(found);
        setNotes(found.notes || []);
        setEditForm({
          title: found.title,
          description: found.description,
          category: found.category,
        });
      } catch (err) {
        console.error("Error fetching:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [id]);

  useEffect(() => {
    if (notes.length > 0) {
      endOfNotesRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [notes]);

  const handleSaveEdit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `${API_BASE_URL}/api/problems/${id}/edit`,
        editForm,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setProblem(res.data);
      setEditMode(false);
    } catch (err) {
      console.error("Error saving edits:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this problem?")) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      await axios.delete(`${API_BASE_URL}/api/problems/${id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      navigate("/problems");
    } catch (err) {
      console.error("Error deleting problem:", err);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.post(
        `${API_BASE_URL}/api/problems/${id}/notes`,
        { text: newNote },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNotes(res.data);
      setNewNote("");
    } catch (err) {
      console.error("Error adding note:", err);
    }
  };

  const handleEditNote = async (noteId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.put(
        `${API_BASE_URL}/api/problems/${id}/notes/${noteId}`,
        { text: editingText },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNotes(res.data);
      setEditingNoteId(null);
      setEditingText("");
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      const res = await axios.delete(
        `${API_BASE_URL}/api/problems/${id}/notes/${noteId}`,
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setNotes(res.data);
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!problem) return <p className="text-center py-20">Problem not found</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-purple-700">🧠 Problem Details</h1>
        <ExportPDF problem={problem} notes={notes} />
      </div>

      {/* Problem Info */}
      <div className="bg-white p-6 rounded shadow space-y-3">
        {editMode ? (
          <>
            <input
              className="w-full border p-2 rounded"
              value={editForm.title}
              onChange={(e) =>
                setEditForm({ ...editForm, title: e.target.value })
              }
              placeholder="Problem Title"
            />
            <textarea
              className="w-full border p-2 rounded"
              rows={4}
              value={editForm.description}
              onChange={(e) =>
                setEditForm({ ...editForm, description: e.target.value })
              }
              placeholder="Description"
            />
            <select
              className="w-full border p-2 rounded"
              value={editForm.category}
              onChange={(e) =>
                setEditForm({ ...editForm, category: e.target.value })
              }
            >
              <option>Personal</option>
              <option>Academic</option>
              <option>Business</option>
              <option>Other</option>
            </select>
            <div className="space-x-2 mt-2">
              <button
                onClick={handleSaveEdit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setEditMode(false)}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold">{problem.title}</h2>
            <p className="text-gray-500">Category: {problem.category}</p>
            <p className="text-gray-700">{problem.description}</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => setEditMode(true)}
                className="bg-yellow-500 text-white px-4 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>

      {/* Notes Section */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-bold text-purple-700 mb-4">📝 Notes</h3>
        <textarea
          className="w-full border p-2 rounded mb-2"
          rows={3}
          placeholder="Write the solution to your problem"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-600 text-white px-4 py-2 rounded mb-6"
        >
          Add Note
        </button>

        {notes.length === 0 ? (
          <p className="text-gray-500">No notes yet.</p>
        ) : (
          <ul className="space-y-4">
            {notes.map((note) => (
              <li key={note._id} className="bg-gray-100 p-3 rounded shadow-sm">
                {editingNoteId === note._id ? (
                  <>
                    <textarea
                      className="w-full border p-2 rounded mb-2"
                      value={editingText}
                      onChange={(e) => setEditingText(e.target.value)}
                      rows={3}
                    />
                    <div className="space-x-2">
                      <button
                        onClick={() => handleEditNote(note._id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingNoteId(null);
                          setEditingText("");
                        }}
                        className="border px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-start gap-2">
                    <p className="text-gray-800 flex-1 whitespace-pre-line">
                      {note.text}
                    </p>
                    <div className="space-x-2">
                      <button
                        onClick={() => {
                          setEditingNoteId(note._id);
                          setEditingText(note.text);
                        }}
                        className="text-yellow-600 font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note._id)}
                        className="text-red-600 font-medium"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
            <div ref={endOfNotesRef}></div>
          </ul>
        )}
      </div>
    </div>
  );
}
