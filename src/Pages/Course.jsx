import { useEffect, useState } from "react";
import axios from "axios";
import { Helmet } from "react-helmet-async";
const API_URL = import.meta.env.VITE_API_URL;
const API = `${API_URL}/courses`;

export default function Course() {
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    link: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState(null);

  // 🔐 USER ROLE CHECK
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user?.role === "admin";
const token = localStorage.getItem("token") || "";
  useEffect(() => {
    fetchCourses();
  }, []);

  // ================= FETCH =================
  const fetchCourses = async () => {
    try {
      const res = await axios.get(API);
      setCourses(res.data);

      if (res.data.length > 0) {
        setSelectedCategory(res.data[0].categorySlug);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // ================= CREATE =================
  const handleCreate = async () => {
    try {
      await axios.post(API, form,
        {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
      );
      setForm({ title: "", description: "", category: "", link: "" });
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE =================
  const handleDelete = async (categorySlug, slug) => {
    try {
      await axios.delete(`${API}/${categorySlug}/${slug}`,
        {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
      );
      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EDIT =================
  const handleEditClick = (course) => {
    setIsEditing(true);
    setEditData(course);

    setForm({
      title: course.title,
      description: course.description,
      category: course.category,
      link: course.link,
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async () => {
    try {
      await axios.put(
        `${API}/${editData.categorySlug}/${editData.slug}`,
        form,
        {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
      );

      setIsEditing(false);
      setEditData(null);
      setForm({ title: "", description: "", category: "", link: "" });

      fetchCourses();
    } catch (err) {
      console.log(err);
    }
  };

  // ================= CATEGORY =================
  const categories = [
    ...new Map(
      courses.map((course) => [
        course.categorySlug,
        {
          category: course.category,
          categorySlug: course.categorySlug,
        },
      ])
    ).values(),
  ];

  const filteredCourses = courses.filter(
    (course) => course.categorySlug === selectedCategory
  );

  const getYoutubeEmbedUrl = (url) => {
    const videoId =
      url.split("v=")[1]?.split("&")[0] || url.split("/").pop();

    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <Helmet>
          <title>Courses | CodeWithRahulKumawat</title>
        </Helmet>

        <h4 className="text-4xl font-bold text-center mb-10 text-orange-400">
          Learn With IIT Graduates - Curated Courses for Developers
        </h4>

        {/* ================= ADMIN FORM ================= */}
        {isAdmin && (
          <div className="bg-slate-900 p-6 rounded-xl mb-10">
            <h2 className="text-xl mb-4">
              {isEditing ? "Update Course" : "Create Course"}
            </h2>

            <div className="grid gap-3">
              <input
                className="p-2 bg-slate-800 rounded"
                placeholder="Title"
                value={form.title}
                onChange={(e) =>
                  setForm({ ...form, title: e.target.value })
                }
              />

              <input
                className="p-2 bg-slate-800 rounded"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />

              <input
                className="p-2 bg-slate-800 rounded"
                placeholder="Category"
                value={form.category}
                onChange={(e) =>
                  setForm({ ...form, category: e.target.value })
                }
              />

              <input
                className="p-2 bg-slate-800 rounded"
                placeholder="YouTube Link"
                value={form.link}
                onChange={(e) =>
                  setForm({ ...form, link: e.target.value })
                }
              />

              {isEditing ? (
                <button
                  onClick={handleUpdate}
                  className="bg-yellow-500 p-2 rounded"
                >
                  Update Course
                </button>
              ) : (
                <button
                  onClick={handleCreate}
                  className="bg-green-600 p-2 rounded"
                >
                  Create Course
                </button>
              )}
            </div>
          </div>
        )}

        {/* ================= CATEGORIES ================= */}
        <div className="flex flex-wrap gap-4 justify-center mb-10">
          {categories.map((cat) => (
            <button
              key={cat.categorySlug}
              onClick={() => {
                setSelectedCategory(cat.categorySlug);
                setSelectedCourse(null);
              }}
              className={`px-6 py-3 rounded-xl ${
                selectedCategory === cat.categorySlug
                  ? "bg-blue-600"
                  : "bg-slate-800"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* ================= COURSES ================= */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {filteredCourses.map((course) => (
            <div
              key={course._id}
              className="bg-slate-900 p-6 rounded-xl border border-slate-800"
            >
              <h3 className="text-xl font-semibold">
                {course.title}
              </h3>

              <p className="text-gray-400 text-sm mb-4">
                {course.description}
              </p>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="bg-blue-600 px-3 py-1 rounded"
                >
                  Watch
                </button>

                {/* ADMIN ONLY ACTIONS */}
                {isAdmin && (
                  <>
                    <button
                      onClick={() => handleEditClick(course)}
                      className="bg-yellow-500 px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          course.categorySlug,
                          course.slug
                        )
                      }
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* ================= VIDEO ================= */}
        {selectedCourse && (
          <div className="bg-slate-900 p-6 rounded-2xl border">
            <h2 className="text-2xl font-bold mb-4">
              {selectedCourse.title}
            </h2>

            <iframe
              className="w-full aspect-video rounded-xl"
              src={getYoutubeEmbedUrl(selectedCourse.link)}
              title={selectedCourse.title}
              allowFullScreen
            />

            <p className="mt-4 text-gray-400">
              {selectedCourse.description}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}