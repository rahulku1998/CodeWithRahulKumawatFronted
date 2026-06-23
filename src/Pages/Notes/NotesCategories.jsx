import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const API_URL = import.meta.env.VITE_API_URL;
export default function NotesCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/notes`)
      .then((res) => {
        const uniqueCategories = [
          ...new Map(
            res.data.map((note) => [
              note.categorySlug,
              {
                category: note.category,
                categorySlug: note.categorySlug,
              },
            ])
          ).values(),
        ];

        setCategories(uniqueCategories);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-12">
          Study Notes
        </h1>
<Helmet>
  <title>Download Notes | CodeWithRahulKumawat</title>
</Helmet>
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.categorySlug}
              to={`/notes/${cat.categorySlug}`}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-8 hover:border-blue-500 transition"
            >
              <div className="text-4xl mb-4">📚</div>

              <h2 className="text-2xl font-bold">
                {cat.category}
              </h2>

              <p className="text-slate-400 mt-2">
                Explore notes from this category.
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}