import React from "react";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import ViewBlog from "./pages/ViewBlog";
import EditBlog from "./pages/EditBlog";
import CategoriesBlog from "./pages/CategoriesBlog";

/**
 * Main application component containing routes
 * @returns {JSX.Element} The application with routing setup
 */
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateBlog />} />
        <Route path="/post/:id" element={<ViewBlog />} />
        <Route path="/edit/:id" element={<EditBlog />} />
        <Route path="/categories" element={<CategoriesBlog />} />
      </Routes>
    </>
  );
}

export default App;
