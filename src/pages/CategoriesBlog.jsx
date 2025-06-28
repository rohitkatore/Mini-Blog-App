import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../utils/storage";
import {
  ArrowLeft,
  Search,
  Filter,
  BookOpen,
  ChevronRight,
} from "lucide-react";

/**
 * CategoriesBlog component - Displays blogs organized by categories
 * @returns {JSX.Element} CategoriesBlog component
 */
function CategoriesBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all"); // Options: "all", "title", "category"
  const [filteredBlogs, setFilteredBlogs] = useState([]);

  // Fetch blogs on component mount
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        // Get blogs from localStorage with simulated delay
        setTimeout(() => {
          const storedBlogs = getBlogs();
          setBlogs(storedBlogs);
          setFilteredBlogs(storedBlogs); // Initialize filtered blogs with all blogs
          setLoading(false);
        }, 300);
      } catch (err) {
        setError("Failed to fetch blogs");
        setLoading(false);
        console.error("Error fetching blogs:", err);
      }
    };

    fetchBlogs();
  }, []);

  // Handle search functionality
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredBlogs(blogs);
      return;
    }

    let results = [];
    const searchTermLower = searchTerm.toLowerCase();

    switch (searchType) {
      case "title":
        results = blogs.filter((blog) =>
          blog.title.toLowerCase().includes(searchTermLower)
        );
        break;
      case "category":
        results = blogs.filter((blog) =>
          blog.category.toLowerCase().includes(searchTermLower)
        );
        break;
      case "all":
      default:
        results = blogs.filter(
          (blog) =>
            blog.title.toLowerCase().includes(searchTermLower) ||
            blog.category.toLowerCase().includes(searchTermLower)
        );
    }

    setFilteredBlogs(results);
  }, [searchTerm, searchType, blogs]);

  /**
   * Group blogs by their category
   * @type {Object} Object with category names as keys and arrays of blogs as values
   */
  const groupedBlogs = filteredBlogs.reduce((acc, blog) => {
    const category = blog.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(blog);
    return acc;
  }, {});

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error) return <div className="text-center text-red-500 p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Navigation bar with improved styling */}
      <nav className="py-4 px-4 bg-white shadow-md border-b border-blue-50">
        <div className="max-w-7xl mx-auto">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <div className="bg-blue-50 p-1.5 rounded-full group-hover:bg-blue-100 transition-colors mr-2">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Enhanced header with icon */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Blog Categories
          </h1>
          <p className="text-gray-600 max-w-lg mx-auto">
            Explore our collection of blogs organized by categories
          </p>
        </div>

        {/* Search Section with improved design */}
        <div className="mb-12">
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-100">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 hover:bg-white"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600 text-sm whitespace-nowrap">
                  Filter by:
                </span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setSearchType("all")}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      searchType === "all"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setSearchType("title")}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      searchType === "title"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Title
                  </button>
                  <button
                    onClick={() => setSearchType("category")}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      searchType === "category"
                        ? "bg-blue-600 text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Category
                  </button>
                </div>
              </div>
            </div>

            {searchTerm && (
              <div className="mt-3 text-sm text-gray-500 flex items-center">
                <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-md mr-2 font-medium">
                  {filteredBlogs.length}
                </span>
                results for "{searchTerm}" in{" "}
                <span className="font-medium ml-1">
                  {searchType === "all" ? "all fields" : searchType}
                </span>
              </div>
            )}
          </div>
        </div>

        {Object.keys(groupedBlogs).length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl shadow-md">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h3 className="text-2xl font-medium text-gray-700 mb-2">
              No matching blogs found
            </h3>
            <p className="text-gray-500 mb-6">
              Try adjusting your search terms or filters
            </p>
            <Link
              to="/create"
              className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-md hover:shadow-lg"
            >
              Create a new blog post
              <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
        ) : (
          Object.entries(groupedBlogs).map(([category, categoryBlogs]) => (
            <div key={category} className="mb-16">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800 relative pl-4">
                  <span className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-full"></span>
                  {category}
                </h2>
                <span className="ml-3 text-sm bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                  {categoryBlogs.length} posts
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {categoryBlogs.map((blog) => (
                  <Link to={`/post/${blog.id}`} key={blog.id} className="group">
                    <div className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 h-full flex flex-col border border-gray-100">
                      {blog.coverImage && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={blog.coverImage}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute top-0 right-0 m-3">
                            <span className="bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                              {blog.readTime}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs flex items-center justify-center font-bold mr-2">
                            {blog.author.charAt(0).toUpperCase()}
                          </span>
                          {blog.author} •{" "}
                          {new Date(blog.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 line-clamp-3 mb-4 flex-grow">
                          {blog.excerpt ||
                            blog.content.substring(0, 120) + "..."}
                        </p>
                        <div className="flex justify-end">
                          <span className="text-blue-600 text-sm font-medium flex items-center group-hover:underline">
                            Read more <ChevronRight className="ml-1 w-4 h-4" />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default CategoriesBlog;
