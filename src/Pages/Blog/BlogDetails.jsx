import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


export default function BlogDetails() {
  const { categorySlug, slug } = useParams();
  const [blog, setBlog] = useState(null);
const API_URL = import.meta.env.VITE_API_URL;
  useEffect(() => {
    axios
      .get(`${API_UL}/blogs/${categorySlug}/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(console.error);
  }, [categorySlug, slug]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="animate-pulse text-blue-400 text-xl">
          Loading article...
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white">
      
      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        {blog.image && (
          <>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 max-w-6xl mx-auto px-6 pb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 backdrop-blur-md">
            {blog.category}
          </span>

          <h1 className="text-4xl md:text-6xl font-bold mt-6 leading-tight max-w-4xl">
            {blog.title}
          </h1>

          <div className="flex items-center gap-4 mt-6 text-slate-300">
            <span>
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>

            <span>•</span>

            <span>
              {Math.max(
                1,
                Math.ceil(blog.description.split(" ").length / 200)
              )}{" "}
              min read
            </span>
          </div>
        </div>
      </div>

      {/* Article */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">

          <div className="prose prose-invert max-w-none">
            <div
              className="text-slate-300 text-lg leading-9 whitespace-pre-line"
            >
              {blog.description}
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl p-8">
            
            <h3 className="text-3xl font-bold mb-4">
              Enjoyed this article?
            </h3>

            <p className="text-slate-400">
              Explore more blogs and improve your skills.
            </p>

          </div>
        </div>
      </div>
    </section>
  );
}