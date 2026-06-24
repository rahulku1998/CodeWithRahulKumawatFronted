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
  <section className="min-h-screen overflow-x-hidden bg-slate-950 text-white py-10 md:py-16 lg:py-20 px-4 sm:px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Heading */}
      <div className="text-center mb-10 md:mb-14">
        <span className="inline-block px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/20 text-blue-400 text-xs md:text-sm font-medium">
          FAANG Interview Preparation
        </span>

        <h1 className="mt-4 md:mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Explore Question Categories
        </h1>

        <Helmet>
          <title>
            Practice Questions | CodeWithRahulKumawat
          </title>
        </Helmet>

        <p className="mt-4 text-sm md:text-base text-slate-400 max-w-2xl mx-auto px-2">
          Practice the most frequently asked coding interview questions
          categorized by topic.
        </p>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-36 md:h-40 rounded-2xl md:rounded-3xl bg-slate-800 animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {categories.map((cat) => (
            <Link
              key={cat.categorySlug}
              to={`/faang-questions/${cat.categorySlug}`}
              className="group relative overflow-hidden rounded-2xl md:rounded-3xl border border-slate-800 bg-slate-900 p-5 md:p-8 hover:border-blue-500/50 transition-all duration-300 md:hover:-translate-y-2"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-cyan-600/10 opacity-0 group-hover:opacity-100 transition duration-300" />

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xl md:text-2xl mb-4 md:mb-5">
                  🚀
                </div>

                <h2 className="text-xl md:text-2xl font-bold mb-3 break-words group-hover:text-blue-400 transition">
                  {cat.category}
                </h2>

                <p className="text-slate-400 text-sm md:text-base">
                  FAANG interview questions and solutions from this topic.
                </p>

                <div className="mt-5 md:mt-6 flex items-center text-sm md:text-base text-blue-400 font-medium">
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