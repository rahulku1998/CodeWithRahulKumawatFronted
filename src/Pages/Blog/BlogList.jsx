import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function BlogList() {
  const { categorySlug } = useParams();
  const [blogs, setBlogs] = useState([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
const isAdmin = user?.role === "admin";
const token = localStorage.getItem("token") || "";

const [form, setForm] = useState({
  title: "",
  description: "",
  category: "",
  image: "",
});

const [isEditing, setIsEditing] = useState(false);
const [editData, setEditData] = useState(null);

  const fetchBlogs = async () => {
  try {
    const res = await axios.get(
      `${API_URL}/blogs/${categorySlug}`
    );

    setBlogs(res.data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchBlogs();
}, [categorySlug]);


const handleCreate = async () => {
  try {
    await axios.post(
      `${API_URL}/blogs`,
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
      image: "",
    });

    fetchBlogs();
  } catch (err) {
    console.log(err);
  }
};

const handleDelete = async (blog) => {
  try {
    await axios.delete(
      `${API_URL}/blogs/${blog.categorySlug}/${blog.slug}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchBlogs();
  } catch (err) {
    console.log(err);
  }
};
const handleEditClick = (blog) => {
  setIsEditing(true);
  setEditData(blog);

  setForm({
    title: blog.title,
    description: blog.description,
    category: blog.category,
    image: blog.image || "",
  });
};

const handleUpdate = async () => {
  try {
    await axios.put(
      `${API_URL}/blogs/${editData.categorySlug}/${editData.slug}`,
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
      image: "",
    });

    fetchBlogs();
  } catch (err) {
    console.log(err);
  }
};





  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm">
            {categorySlug.replace("-", " ").toUpperCase()}
          </span>

          <h1 className="text-5xl md:text-6xl font-bold mt-6">
            Latest
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {" "}Blogs
            </span>
          </h1>

          <p className="text-slate-400 mt-4">
            Explore all articles in this category.
          </p>
        </div>

        {isAdmin && (
  <div className="bg-slate-900 p-6 rounded-2xl mb-10">
    <h2 className="text-2xl font-bold mb-4">
      {isEditing ? "Update Blog" : "Create Blog"}
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

      <input
        className="bg-slate-800 p-3 rounded"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) =>
          setForm({ ...form, image: e.target.value })
        }
      />

      <textarea
        rows={8}
        className="bg-slate-800 p-3 rounded"
        placeholder="Blog Content"
        value={form.description}
        onChange={(e) =>
          setForm({
            ...form,
            description: e.target.value,
          })
        }
      />

      {isEditing ? (
        <button
          onClick={handleUpdate}
          className="bg-yellow-500 p-3 rounded"
        >
          Update Blog
        </button>
      ) : (
        <button
          onClick={handleCreate}
          className="bg-green-600 p-3 rounded"
        >
          Create Blog
        </button>
      )}
    </div>
  </div>
)}

        {/* Blog Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blogs/${blog.categorySlug}/${blog.slug}`}
              className="group relative"
            >
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500"></div>

              {/* Card */}
              <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/40 transition-all duration-300 hover:-translate-y-2">

                {/* Image */}
                {blog.image && (
                  <div className="overflow-hidden">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-60 object-cover group-hover:scale-110 transition duration-500"
                    />
                  </div>
                )}
                 {isAdmin && (
  <div className="flex gap-3 mt-4">
    <button
      onClick={(e) => {
        e.preventDefault();
        handleEditClick(blog);
      }}
      className="bg-yellow-500 px-3 py-1 rounded"
    >
      Edit
    </button>

    <button
      onClick={(e) => {
        e.preventDefault();
        handleDelete(blog);
      }}
      className="bg-red-600 px-3 py-1 rounded"
    >
      Delete
    </button>
  </div>
)}
                {/* Content */}
                <div className="p-6">

                  <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-4">
                    {blog.category}
                  </span>

                  <h2 className="text-2xl font-bold mb-3 line-clamp-2">
                    {blog.title}
                  </h2>

                  <p className="text-slate-400 line-clamp-3 mb-5">
                    {blog.description}
                  </p>

                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-blue-400 font-medium flex items-center">
                      Read More
                      <span className="ml-2 group-hover:translate-x-2 transition">
                        →
                      </span>
                    </span>
                  </div>

                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {blogs.length === 0 && (
          <div className="text-center py-20">
            <h2 className="text-3xl font-bold mb-3">
              No Blogs Found
            </h2>
            <p className="text-slate-400">
              Blogs for this category will appear here.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}