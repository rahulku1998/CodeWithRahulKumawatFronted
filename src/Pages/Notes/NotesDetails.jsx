import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
const API_URL = import.meta.env.VITE_API_URL;
export default function NotesDetails() {
  const { categorySlug, slug } = useParams();

  const [note, setNote] = useState(null);

  useEffect(() => {
    axios
      .get(
        `${API_URL}/notes/${categorySlug}/${slug}`
      )
      .then((res) => {
        setNote(res.data);
      })
      .catch(console.error);
  }, [categorySlug, slug]);

  if (!note) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center">
        Loading...
      </div>
    );
  }

  return (
  <div className="min-h-screen overflow-x-hidden bg-slate-950 text-white py-10 md:py-16 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">

      {/* Back Button */}
      <Link
        to={`/notes/${categorySlug}`}
        className="inline-flex items-center text-sm md:text-base text-blue-400 hover:text-blue-300 transition"
      >
        ← Back
      </Link>

      {/* Title */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-5 md:mt-6 break-words leading-tight">
        {note.title}
      </h1>

      <Helmet>
        <title>
          Detailed Notes | CodeWithRahulKumawat
        </title>
      </Helmet>

      {/* Notes Content */}
      <div className="mt-6 md:mt-8 bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-8">
        <div className="whitespace-pre-wrap break-words text-sm md:text-base leading-7 md:leading-8 text-slate-300">
          {note.description}
        </div>
      </div>

      {/* Resource Button */}
      {note.link && (
        <a
          href={note.link}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center w-full sm:w-auto mt-6 md:mt-8 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-medium transition"
        >
          Open Resource →
        </a>
      )}

    </div>
  </div>
);
}