import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const API_URL = import.meta.env.VITE_API_URL;
export default function NotesList() {
  const { categorySlug } = useParams();

  const [notes, setNotes] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdmin = user?.role === "admin";
const token = localStorage.getItem("token") || "";

const [form, setForm] = useState({
  title: "",
  description: "",
  category: "",
  link: "",
});

const [isEditing, setIsEditing] = useState(false);
const [editData, setEditData] = useState(null);

  const fetchNotes = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/notes`
    );

    setNotes(
      res.data.filter(
        (note) => note.categorySlug === categorySlug
      )
    );
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchNotes();
}, [categorySlug]);


const handleCreate = async () => {
  try {
    await axios.post(
      `${API_URL}/notes`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForm({
      title: "",
      description: "",
      category: "",
      link: "",
    });

    fetchNotes();
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (note) => {
  try {
    await axios.delete(
      `${API_URL}/notes/${note.categorySlug}/${note.slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchNotes();
  } catch (err) {
    console.log(err);
  }
};

const handleEditClick = (note) => {
  setIsEditing(true);
  setEditData(note);

  setForm({
    title: note.title,
    description: note.description,
    category: note.category,
    link: note.link || "",
  });
};

const handleUpdate = async () => {
  try {
    await axios.put(
      `${API_URL}/notes/${editData.categorySlug}/${editData.slug}`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setIsEditing(false);
    setEditData(null);

    setForm({
      title: "",
      description: "",
      category: "",
      link: "",
    });

    fetchNotes();
  } catch (err) {
    console.log(err);
  }
};

  return (
  <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white py-10 md:py-16 px-4 sm:px-6">
    <div className="max-w-6xl mx-auto">

      {/* Back Button */}
      <Link
        to="/notes"
        className="inline-flex items-center text-sm md:text-base text-blue-400 hover:text-blue-300 transition"
      >
        ← Back
      </Link>

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold capitalize mt-4 mb-8 md:mb-10 break-words">
        {categorySlug.replace(/-/g, " ")} Notes
      </h1>

      <Helmet>
        <title>
          Notes List | CodeWithRahulKumawat
        </title>
      </Helmet>

      {/* Admin Form */}
      {isAdmin && (
        <div className="bg-slate-900 p-4 md:p-6 rounded-2xl md:rounded-3xl mb-8 md:mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            {isEditing ? "Update Note" : "Create Note"}
          </h2>

          <div className="grid gap-3">

            <input
              className="bg-slate-800 p-3 rounded-lg"
              placeholder="Title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="bg-slate-800 p-3 rounded-lg"
              placeholder="Category"
              value={form.category}
              onChange={(e) =>
                setForm({ ...form, category: e.target.value })
              }
            />

            <textarea
              rows={6}
              className="bg-slate-800 p-3 rounded-lg"
              placeholder="Description"
              value={form.description}
              onChange={(e) =>
                setForm({
                  ...form,
                  description: e.target.value,
                })
              }
            />

            <input
              className="bg-slate-800 p-3 rounded-lg"
              placeholder="Resource Link"
              value={form.link}
              onChange={(e) =>
                setForm({ ...form, link: e.target.value })
              }
            />

            {isEditing ? (
              <button
                onClick={handleUpdate}
                className="bg-yellow-500 p-3 rounded-lg font-medium"
              >
                Update Note
              </button>
            ) : (
              <button
                onClick={handleCreate}
                className="bg-green-600 p-3 rounded-lg font-medium"
              >
                Create Note
              </button>
            )}
          </div>
        </div>
      )}

      {/* Notes List */}
      <div className="space-y-4 md:space-y-5">
        {notes.map((note) => (
          <Link
            key={note._id}
            to={`/notes/${note.categorySlug}/${note.slug}`}
            className="block bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-4 md:p-6 hover:border-blue-500 transition-all duration-300 md:hover:-translate-y-1"
          >
            <h2 className="text-xl md:text-2xl font-semibold break-words">
              {note.title}
            </h2>

            <p className="text-sm md:text-base text-slate-400 mt-2">
              Open detailed notes →
            </p>

            {isAdmin && (
              <div className="flex flex-wrap gap-2 md:gap-3 mt-4">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleEditClick(note);
                  }}
                  className="bg-yellow-500 px-3 py-1 rounded text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(note);
                  }}
                  className="bg-red-600 px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  </div>
);
}