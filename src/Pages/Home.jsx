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
    <div className="bg-slate-50">
        <Helmet>
        <title>Home | CodeWithRahulKumawat</title>
      </Helmet>

      {/* Hero */}
      <section className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">

  <div className="text-center max-w-5xl mx-auto">

    {/* Badge */}
    <span className="inline-block bg-slate-800/60 backdrop-blur-md px-5 py-2 rounded-full text-gray-200">
      One Stop Solution for Software Developers
    </span>

    {/* Title */}
    <h1 className="text-5xl md:text-7xl font-bold mt-8 leading-tight text-white">
      Welcome to{" "}
      <span className="text-orange-400">
        CodeWithRahulKumawat
      </span>
    </h1>

    {/* Typing Animation */}
    <div className="text-3xl md:text-5xl font-bold text-blue-400 mt-6 h-20 flex items-center justify-center">
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
    <p className="mt-8 text-base md:text-xl text-gray-300 max-w-2xl mx-auto">
      Master DSA, Development, AI Engineering and System Design
      through structured roadmaps and real-world projects.
    </p>

    {/* Buttons */}
    <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-10">
      <Link to="/courses">
        <button className="bg-white cursor-pointer  text-black px-8 py-4 rounded-xl font-semibold hover:scale-105 transition">
          Explore Courses
        </button>
      </Link>

      <Link to="/faang-questions">
        <button className="border border-white cursor-pointer text-white px-8 py-4 rounded-xl hover:bg-white/10 transition">
          Practice Questions
        </button>
      </Link>
    </div>

  </div>

</section>

      {/* Scrolling Topics */}
      <section className="py-16 bg-white overflow-hidden">
        <div className="flex whitespace-nowrap animate-marquee">
          {[...topics, ...topics].map((item, index) => (
            <div
              key={index}
              className="mx-4 px-6 py-3 bg-blue-100 rounded-full text-lg font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Popular Courses */}
      <section className="max-w-7xl mx-auto py-20 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">
          Popular Learning Paths
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold">DSA Mastery</h3>
            <p className="mt-4 text-gray-600">
              Crack coding interviews with structured DSA.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold">Java Spring Boot</h3>
            <p className="mt-4 text-gray-600">
              Build production-grade backend systems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold">AI Engineering</h3>
            <p className="mt-4 text-gray-600">
              Learn LLMs, RAG, Agents and AI products.
            </p>
          </div>
        </div>
      </section>

      {/* FAANG */}
      <section className="bg-blue-600 text-white py-20 text-center">
        <h2 className="text-5xl font-bold">
          Practice FAANG Interview Questions For Free
        </h2>

        <p className="mt-4 text-xl">
          Amazon, Google, Meta, Microsoft and Netflix
        </p>
      </section>
    </div>
  );
}