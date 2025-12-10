import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import HomePage from "./pages/HomePage";
import AllBlogs from "./pages/AllBlogs";
import Dashboard from "./pages/Dashboard";
import BlogInfo from "./pages/BlogInfo";
import AdminLogin from "./pages/AdminLogin";
import NoPage from "./pages/NoPage";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import CreateBlog from "./pages/CreateBlog";

export default function App() {
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
      path: "/admin",
      element: (
        <>
          <Navbar />
          <AdminLogin />
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
          <CreateBlog />
        </>
      ),
    },
    {
      path: "*",
      element: (
        <>
          <NoPage />
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
}
