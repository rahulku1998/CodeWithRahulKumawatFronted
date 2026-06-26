import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function QuestionDetails() {
  const { categorySlug, slug } = useParams();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/faangqs/${categorySlug}/${slug}`)
      .then((res) => {
        setQuestion(res.data);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [categorySlug, slug]);

  const copyAnswer = () => {
    navigator.clipboard.writeText(question.answer);
    alert("Solution copied!");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <h2 className="text-2xl font-bold">Question Not Found</h2>
      </div>
    );
  }
return (
  <section className="min-h-screen overflow-x-hidden bg-slate-950 text-white py-10 md:py-16 px-4 sm:px-6">
    <div className="max-w-5xl mx-auto">

      {/* Back Button */}
      <Link
        to={`/faang-questions/${categorySlug}`}
        className="inline-flex items-center text-sm md:text-base text-blue-400 hover:text-blue-300 transition"
      >
        ← Back to Questions
      </Link>

      {/* Title */}
      <div className="mt-6 md:mt-8">
        <span className="inline-flex px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-blue-500/20 text-blue-400 text-xs md:text-sm font-medium">
          {question.category}
        </span>

        <h1 className="mt-4 md:mt-5 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight break-words">
          {question.title}
        </h1>
      </div>

      {/* Question Card */}
      <div className="mt-8 md:mt-10 bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
          📝 Problem Statement
        </h2>

        <div className="text-sm md:text-base text-slate-300 whitespace-pre-wrap break-words leading-7 md:leading-8">
          {question.question}
        </div>
      </div>


{/* Resource Link */}
      {question.link && (
        <div className="mt-6 md:mt-8 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/20 rounded-2xl md:rounded-3xl p-5 md:p-8">
          <h3 className="text-lg md:text-xl font-bold mb-3">
            🚀 Practice on LeetCode / GeeksforGeeks / HackerRank
          </h3>

          <p className="text-sm md:text-base text-slate-300 mb-5">
             Strengthen your problem-solving skills by solving this question yourself before reviewing the solution.
          </p>

          <a
            href={question.link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto bg-green-600 text-black px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
          >
            🔗 Start Practicing →
          </a>
        </div>
      )}

      {/* Solution Card */}
      <div className="mt-6 md:mt-8 bg-slate-900 border border-slate-800 rounded-2xl md:rounded-3xl p-5 md:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h2 className="text-xl md:text-2xl font-bold">
            💡 Solution
          </h2>

          <button
            onClick={copyAnswer}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-medium transition cursor-pointer"
          >
            Copy Solution
          </button>
        </div>

        <div className="text-sm md:text-base text-slate-300 whitespace-pre-wrap break-words leading-7 md:leading-8">
          {question.answer}
        </div>
      </div>

      

      
      

      {/* Bottom CTA */}
      <div className="mt-10 md:mt-12 text-center border-t border-slate-800 pt-8 md:pt-10">
        <h3 className="text-xl md:text-2xl font-bold">
          Ready for More Practice?
        </h3>

        <p className="text-sm md:text-base text-slate-400 mt-3">
          Explore more FAANG interview questions from this category.
        </p>

        <Link
          to={`/faang-questions/${categorySlug}`}
          className="inline-block mt-6 w-full sm:w-auto bg-blue-600 hover:bg-blue-700 px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold transition"
        >
          View More Questions
        </Link>
      </div>

    </div>
  </section>
);

}