import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;
export default function FaangCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/faangqs`)
      .then((res) => {
        const uniqueCategories = [
          ...new Map(
            res.data.map((item) => [
              item.categorySlug,
              {
                category: item.category,
                categorySlug: item.categorySlug,
              },
            ])
          ).values(),
        ];

        setCategories(uniqueCategories);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="min-h-screen bg-slate-950 text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
            FAANG Interview Preparation
          </span>

          <h1 className="mt-6 text-4xl md:text-6xl font-bold">
            Explore Question Categories
          </h1>
<Helmet>
  <title>
    Practice Questions | CodeWithRahulKumawat
  </title>
</Helmet>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            Practice the most frequently asked coding interview questions
            categorized by topic.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="h-40 rounded-3xl bg-slate-800 animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.categorySlug}
                to={`/faang-questions/${cat.categorySlug}`}
                className="group relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-8 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2"
              >
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition duration-300" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-2xl mb-5">
                    🚀
                  </div>

                  <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-400 transition">
                    {cat.category}
                  </h2>

                  <p className="text-slate-400 text-sm">
                    FAANG interview questions and solutions from this topic.
                  </p>

                  <div className="mt-6 flex items-center text-blue-400 font-medium">
                    Explore Questions
                    <span className="ml-2 group-hover:translate-x-2 transition">
                      →
                    </span>
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