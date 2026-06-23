import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function QuestionList() {
  const { categorySlug } = useParams();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdmin = user?.role === "admin";
const token = localStorage.getItem("token") || "";

const [form, setForm] = useState({
  title: "",
  category: "",
  question: "",
  answer: "",
  link: "",
});

const [isEditing, setIsEditing] = useState(false);
const [editData, setEditData] = useState(null);
  const fetchQuestions = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/faangqs`
    );

    const filteredQuestions = res.data.filter(
      (q) => q.categorySlug === categorySlug
    );

    setQuestions(filteredQuestions);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchQuestions();
}, [categorySlug]);



const handleCreate = async () => {
  try {
    await axios.post(
      `${API_URL}/faangqs`,
      form,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setForm({
      title: "",
      category: "",
      question: "",
      answer: "",
      link: "",
    });

    fetchQuestions();
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (question) => {
  try {
    await axios.delete(
      `${API_URL}/faangqs/${question.categorySlug}/${question.slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchQuestions();
  } catch (err) {
    console.log(err);
  }
};

const handleEditClick = (question) => {
  setIsEditing(true);
  setEditData(question);

  setForm({
    title: question.title,
    category: question.category,
    question: question.question,
    answer: question.answer,
    link: question.link || "",
  });
};

const handleUpdate = async () => {
  try {
    await axios.put(
      `${API_URL}/faangqs/${editData.categorySlug}/${editData.slug}`,
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
      category: "",
      question: "",
      answer: "",
      link: "",
    });

    fetchQuestions();
  } catch (err) {
    console.log(err);
  }
};


  return (
    <section className="min-h-screen bg-slate-950 text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/faang-questions"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Categories
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold mt-4 capitalize">
            {categorySlug.replace(/-/g, " ")} Questions
          </h1>

          <p className="text-slate-400 mt-3">
            Practice top interview questions from this category.
          </p>
        </div>


       {isAdmin && (
  <div className="bg-slate-900 p-6 rounded-2xl mb-10">
    <h2 className="text-2xl font-bold mb-4">
      {isEditing ? "Update Question" : "Create Question"}
    </h2>

    <div className="grid gap-3">
      <input
        className="bg-slate-800 p-3 rounded"
        placeholder="Title"
        value={form.title}
        onChange={(e) =>
          setForm({ ...form, title: e.target.value })
        }
      />

      <input
        className="bg-slate-800 p-3 rounded"
        placeholder="Category"
        value={form.category}
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />

      <textarea
        className="bg-slate-800 p-3 rounded"
        placeholder="Question"
        rows={4}
        value={form.question}
        onChange={(e) =>
          setForm({ ...form, question: e.target.value })
        }
      />

      <textarea
        className="bg-slate-800 p-3 rounded"
        placeholder="Answer"
        rows={6}
        value={form.answer}
        onChange={(e) =>
          setForm({ ...form, answer: e.target.value })
        }
      />

      <input
        className="bg-slate-800 p-3 rounded"
        placeholder="Resource Link"
        value={form.link}
        onChange={(e) =>
          setForm({ ...form, link: e.target.value })
        }
      />

      {isEditing ? (
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 p-3 rounded"
        >
          Update Question
        </button>
      ) : (
        <button
          onClick={handleCreate}
          className="bg-green-600 p-3 rounded"
        >
          Create Question
        </button>
      )}
    </div>
  </div>
)}
    



        {/* Loading */}
        {loading ? (
          <div className="space-y-5">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-24 rounded-2xl bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : questions.length === 0 ? (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold">
              No Questions Found
            </h2>
            <p className="text-slate-400 mt-2">
              This category doesn't have any questions yet.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {questions.map((question, index) => (
              <Link
                key={question._id}
                to={`/faang-questions/${question.categorySlug}/${question.slug}`}
                className="block group"
              >
                <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 hover:border-blue-500 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold">
                      {index + 1}
                    </div>

                    <div className="flex-1">
                      <h2 className="text-xl font-semibold group-hover:text-blue-400 transition">
                        {question.title}
                      </h2>

                      <p className="text-slate-400 mt-2 line-clamp-2">
                        {question.question}
                      </p>

                      <div className="mt-4 flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-slate-800 text-sm text-slate-300">
                          {question.category}
                        </span>

                        <span className="text-blue-400 text-sm font-medium">
                          View Solution →
                        </span>
                        {isAdmin && (
  <div className="flex gap-3 mt-4">
    <button
      onClick={(e) => {
        e.preventDefault();
        handleEditClick(question);
      }}
      className="bg-yellow-500 px-3 py-1 rounded"
    >
      Edit
    </button>

    <button
      onClick={(e) => {
        e.preventDefault();
        handleDelete(question);
      }}
      className="bg-red-600 px-3 py-1 rounded"
    >
      Delete
    </button>
  </div>
)}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}