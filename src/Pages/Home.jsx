import { TypeAnimation } from "react-type-animation";
import {Link} from 'react-router-dom'
import {Helmet} from 'react-helmet-async';
export default function Home() {
  const topics = [
    "Learn DSA",
    "Java Spring Boot",
    "MERN Stack",
    "System Design",
    "AI Engineering",
    "Machine Learning",
  ];
  return (
  <div className="bg-slate-50 overflow-x-hidden pb-16 md:pb-0">

    <Helmet>
      <title>Home | CodeWithRahulKumawat</title>
    </Helmet>

    {/* Hero */}
    <section className="min-h-[85vh] md:min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4 sm:px-6 py-12">

      <div className="text-center max-w-5xl mx-auto">

        {/* Badge */}
        <span className="inline-block bg-slate-800/60 backdrop-blur-md px-3 sm:px-4 md:px-5 py-2 rounded-full text-xs sm:text-sm md:text-base text-gray-200">
          One Stop Solution for Software Developers
        </span>

        {/* Title */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mt-6 md:mt-8 leading-tight text-white px-2">
          Welcome to{" "}
          <span className="text-orange-400 break-words">
            CodeWithRahulKumawat
          </span>
        </h1>

        {/* Typing Animation */}
        <div className="text-lg sm:text-3xl md:text-5xl font-bold text-blue-400 mt-6 h-14 sm:h-16 md:h-20 flex items-center justify-center text-center px-4">
          <TypeAnimation
            sequence={[
              "Learn DSA",
              2000,
              "Learn MERN Stack",
              2000,
              "Learn AI Engineering",
              2000,
              "Learn Spring Boot",
              2000,
              "Learn System Design",
              2000,
              "Learn C++",
              2000,
            ]}
            speed={40}
            repeat={Infinity}
          />
        </div>

        {/* Description */}
        <p className="mt-6 md:mt-8 text-sm sm:text-base md:text-xl text-gray-300 max-w-2xl mx-auto px-2">
          Master DSA, Development, AI Engineering and System Design
          through structured roadmaps and real-world projects.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 md:gap-4 mt-8 md:mt-10">

          <Link
            to="/courses"
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto bg-white text-black px-6 md:px-8 py-3 md:py-4 rounded-xl font-semibold hover:scale-105 transition">
              Explore Courses
            </button>
          </Link>

          <Link
            to="/faang-questions"
            className="w-full sm:w-auto"
          >
            <button className="w-full sm:w-auto border border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-xl hover:bg-white/10 transition">
              Practice Questions
            </button>
          </Link>

        </div>

      </div>
    </section>

    {/* Scrolling Topics */}
    <section className="py-10 md:py-16 bg-white overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...topics, ...topics].map((item, index) => (
          <div
            key={index}
            className="mx-2 md:mx-4 px-4 md:px-6 py-2 md:py-3 bg-blue-100 rounded-full text-sm md:text-lg font-semibold"
          >
            {item}
          </div>
        ))}
      </div>
    </section>

    {/* Popular Courses */}
    <section className="max-w-7xl mx-auto py-12 md:py-20 px-4 sm:px-6">

      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">
        Popular Learning Paths
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-8">

        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition">
          <h3 className="text-xl md:text-2xl font-bold">
            DSA Mastery
          </h3>

          <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base">
            Crack coding interviews with structured DSA.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition">
          <h3 className="text-xl md:text-2xl font-bold">
            Java Spring Boot
          </h3>

          <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base">
            Build production-grade backend systems.
          </p>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition">
          <h3 className="text-xl md:text-2xl font-bold">
            AI Engineering
          </h3>

          <p className="mt-3 md:mt-4 text-gray-600 text-sm md:text-base">
            Learn LLMs, RAG, Agents and AI products.
          </p>
        </div>

      </div>
    </section>

    {/* FAANG Section */}
    <section className="bg-blue-600 text-white py-12 md:py-20 text-center px-4">

      <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
        Practice FAANG Interview Questions For Free
      </h2>

      <p className="mt-4 text-sm sm:text-base md:text-xl">
        Amazon, Google, Meta, Microsoft and Netflix
      </p>

    </section>

  </div>
);
}