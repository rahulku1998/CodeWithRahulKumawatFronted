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
  <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white py-10 md:py-16 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">

      {/* Heading */}
      <div className="text-center mb-8 md:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
          Study Notes
        </h1>

        <Helmet>
          <title>Download Notes | CodeWithRahulKumawat</title>
          <meta
    name="description"
    content={`Explore ${categories.length}+ programming notes categories for DSA, Web Development and System Design.`}
  />

  <link
    rel="canonical"
    href="https://www.codewithrahulkumawat.com/notes"
  />
        </Helmet>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {categories.map((cat) => (
          <Link
            key={cat.categorySlug}
            to={`/notes/${cat.categorySlug}`}
            className="bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-blue-500 transition-all duration-300 md:hover:-translate-y-1"
          >
            <div className="text-3xl md:text-4xl mb-4">
              📚
            </div>

            <h2 className="text-xl md:text-2xl font-bold break-words">
              {cat.category}
            </h2>

            <p className="text-sm md:text-base text-slate-400 mt-2">
              Explore notes from this category.
            </p>
          </Link>
        ))}
      </div>

    </div>
  </div>
);

}