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
    <div className="min-h-screen bg-slate-950 text-white py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <Link
          to={`/notes/${categorySlug}`}
          className="text-blue-400"
        >
          ← Back
        </Link>

        <h1 className="text-5xl font-bold mt-6">
          {note.title}
        </h1>
<Helmet>
  <title>
    Detailed Notes | CodeWithRahulKumawat
  </title>
</Helmet>
        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-3xl p-8">
          <div className="whitespace-pre-wrap leading-8 text-slate-300">
            {note.description}
          </div>
        </div>

        {note.link && (
          <a
            href={note.link}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-8 bg-blue-600 px-6 py-3 rounded-xl"
          >
            Open Resource →
          </a>
        )}
      </div>
    </div>
  );
}