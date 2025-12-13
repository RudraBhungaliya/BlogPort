import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { useContext } from "react";
import BlogContext from "./context/data/myContext";

import HomePage from "./pages/HomePage";
import AllBlogs from "./pages/AllBlogs";
import Dashboard from "./pages/Dashboard";
import BlogInfo from "./pages/BlogInfo";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CreateBlog from "./pages/CreateBlog";
import EditBlog from "./pages/EditBlog";
import Loader from "./components/Loader";
import ErrorPage from "./pages/ErrorPage";
import About from "./pages/AboutUsPage";
import Contact from "./pages/ContactUsPage";

const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function App() {
  const { loaded, setToken, setUser, token } = useContext(BlogContext);

  // Load user data from stored token on app initialization
  useEffect(() => {
    const loadUserFromToken = async () => {
      const storedToken = localStorage.getItem("token");

      if (storedToken && !token) {
        setToken(storedToken);
      }
    };

    loadUserFromToken();
  }, []);

  if (!loaded) return <Loader />;
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <HomePage />
          <Footer />
        </>
      ),
    },
    {
      path: "/blog/:id",
      element: (
        <>
          <Navbar />
          <BlogInfo />
          <Footer />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar />
          <Dashboard />
          <Footer />
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          <About />
          <Footer />
        </>
      ),
    },
    {
      path: "/contact",
      element: (
        <>
          <Navbar />
          <Contact />
          <Footer />
        </>
      ),
    },
    {
      path: "/edit-blog/:id",
      element: (
        <>
          <Navbar />
          <EditBlog />
          <Footer />
        </>
      ),
    },
    {
      path: "/blogs",
      element: (
        <>
          <Navbar />
          <AllBlogs />
          <Footer />
        </>
      ),
    },
    {
      path: "create-blog",
      element: (
        <>
          <Navbar />
          <CreateBlog />
          <Footer />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <ErrorPage />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
