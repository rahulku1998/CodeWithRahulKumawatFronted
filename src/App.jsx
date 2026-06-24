import { useState } from 'react'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './Pages/Home.jsx'
import  { Route ,Routes } from 'react-router-dom'
import Course from './Pages/Course.jsx'
import Freelance from './Pages/Freelance.jsx'
import BlogDetails from './Pages/Blog/BlogDetails.jsx'
import Categories from './Pages/Blog/Categories.jsx'
import BlogList from './Pages/Blog/BlogList.jsx'
import FaangCategories from './Pages/FaangQ/Categories.jsx'
import QuestionList from './Pages/FaangQ/QuestionList.jsx'
import QuestionDetails from './Pages/FaangQ/QuestionDetails.jsx'
import NotesCategories from './Pages/Notes/NotesCategories.jsx'
import NotesList from './Pages/Notes/NotesList.jsx'
import NotesDetails from './Pages/Notes/NotesDetails.jsx'
import Contact from './Pages/Contact.jsx'
import ScrollToTop from "./components/ScrollToTop";
import Login from "./Pages/Login.jsx"
import Register from "./Pages/Register.jsx"
import Forget from "./Pages/ForgotPassword.jsx"
import ResetPassword from "./Pages/ResetPassword.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './App.css'

function App() {
  return (
    <>
    <ScrollToTop />
    <Header />
    <Routes>
      <Route path="/" element={<Home/>} />
     <Route path="/courses" element={<Course/>} />
     <Route path="/contact" element={<Freelance/>} />
     <Route path="/blogs" element={<Categories/>} />
     <Route path="/blogs/:categorySlug" element={<BlogList/>} />
     <Route path="/blogs/:categorySlug/:slug" element={<BlogDetails/>} />
     <Route path="/faang-questions" element={<FaangCategories/>} />
     <Route path="/faang-questions/:categorySlug" element={<QuestionList/>} />
     <Route path="/faang-questions/:categorySlug/:slug" element={<QuestionDetails/>} />
     {/* Add more routes as needed */}
     <Route path="/notes" element={<NotesCategories/>} />
     <Route path="/notes/:categorySlug" element={<NotesList/>} />
     <Route path="/notes/:categorySlug/:slug" element={<NotesDetails/>} />
      <Route path="/contacts" element={<Contact/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
     <Route path="/forgetpass" element={<Forget/>}/>
     <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
    <Footer />
    <ToastContainer
    position="top-right"
    autoClose={3000}
    theme="dark"
  />
    </>
  )
}

export default App
