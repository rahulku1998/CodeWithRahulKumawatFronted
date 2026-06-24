import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";


export default function Categories() {
  const [categories, setCategories] = useState([]);
   const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios.get(`${API_URL}/blogs`)
      .then((res) => {
        const uniqueCategories = [
          ...new Map(
            res.data.map((blog) => [
              blog.categorySlug,
              {
                category: blog.category,
                categorySlug: blog.categorySlug,
              },
            ])
          ).values(),
        ];
        setCategories(uniqueCategories);
      })
      .catch(console.error);
  }, []);

  return (
  <section className="min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-10 md:py-20 px-4 md:px-6">
    <div className="max-w-7xl mx-auto">
      
      {/* Heading */}
      <div className="text-center mb-10 md:mb-16">
        <span className="inline-block px-3 py-1 md:px-4 md:py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs md:text-sm">
          Explore Blogs
        </span>

        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mt-4 md:mt-6 leading-tight">
          Enrich Your Knowledge with{" "}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            {" "}Blogs
          </span>
        </h1>
        <Helmet>
          <title>
            Blog | CodeWithRahulKumawat
          </title>
        </Helmet>

        <p className="text-slate-400 text-sm md:text-base mt-5 max-w-2xl mx-auto px-2">
          Learn DSA, Development, System Design, Java,
          React and more through carefully written blogs.
        </p>
      </div>

      {/* Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {categories.map((cat) => (
          <Link
            key={cat.categorySlug}
            to={`/blogs/${cat.categorySlug}`}
            className="group relative overflow-hidden"
          >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition duration-500" />

            {/* Card */}
            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl md:rounded-3xl p-5 md:p-8 hover:border-blue-500/40 transition-all duration-300 md:hover:-translate-y-2">
              
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xl md:text-2xl mb-4 md:mb-6">
                📚
              </div>

              <h2 className="text-xl md:text-2xl font-bold mb-3 break-words">
                {cat.category}
              </h2>

              <p className="text-sm md:text-base text-slate-400">
                Explore all articles related to{" "}
                {cat.category}.
              </p>

              <div className="mt-5 md:mt-6 flex items-center text-sm md:text-base text-blue-400 font-medium group-hover:text-blue-500 transition duration-300 backdrop-blur-md">
                Read More
                <span className="ml-2 group-hover:translate-x-2 transition">
                  →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </section>
);
}