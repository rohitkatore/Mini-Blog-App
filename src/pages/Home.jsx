import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  PenLine,
  Search,
  Layout,
  Plus,
  BookOpen,
  Filter,
  ChevronRight,
  Bookmark,
} from "lucide-react";
import { getBlogs } from "../utils/storage";

/**
 * Home component - Main page displaying blog listings
 * @returns {JSX.Element} Home component
 */
function Home() {
  // State management
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");

  /**
   * Categories used for filtering
   * @constant {Array}
   */
  const CATEGORIES = [
    "All",
    "Technology",
    "Design",
    "Travel",
    "Health",
    "Business",
  ];

  // Load blogs from localStorage
  useEffect(() => {
    const storedBlogs = getBlogs();
    setBlogs(storedBlogs);
    setFilteredBlogs(storedBlogs);
  }, []);

  // Filter blogs based on search term and category
  useEffect(() => {
    let results = blogs;

    // Filter by search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      results = results.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchTermLower) ||
          blog.content.toLowerCase().includes(searchTermLower) ||
          blog.author.toLowerCase().includes(searchTermLower) ||
          blog.category.toLowerCase().includes(searchTermLower)
      );
    }

    // Filter by category
    if (activeCategory !== "All") {
      results = results.filter(
        (blog) => blog.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    setFilteredBlogs(results);
  }, [searchTerm, blogs, activeCategory]);

  /**
   * Get content snippet (first 100 characters)
   * @param {string} content - The full content text
   * @returns {string} Truncated content with ellipsis if needed
   */
  const getSnippet = (content) => {
    const MAX_SNIPPET_LENGTH = 100;
    return content.length > MAX_SNIPPET_LENGTH
      ? content.substring(0, MAX_SNIPPET_LENGTH) + "..."
      : content;
  };

  /**
   * Get category-specific styling
   * @param {string} category - The blog category
   * @returns {string} CSS classes for the category badge
   */
  const getCategoryColor = (category) => {
    const categoryColors = {
      technology: "bg-blue-100 text-blue-800",
      design: "bg-purple-100 text-purple-800",
      travel: "bg-green-100 text-green-800",
      health: "bg-red-100 text-red-800",
      business: "bg-amber-100 text-amber-800",
      food: "bg-emerald-100 text-emerald-800",
      lifestyle: "bg-pink-100 text-pink-800",
      fashion: "bg-indigo-100 text-indigo-800",
      education: "bg-cyan-100 text-cyan-800",
      sports: "bg-orange-100 text-orange-800",
      other: "bg-gray-100 text-gray-800",
    };

    return categoryColors[category.toLowerCase()] || categoryColors.other;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Section */}
      <header className="pt-10 pb-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-600 opacity-5 z-0"></div>
        <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-blue-200 opacity-20 z-0"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-indigo-200 opacity-20 z-0"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div className="mb-6 md:mb-0">
              <div className="flex items-center space-x-3 mb-3">
                <div className="bg-white p-2 rounded-lg shadow-md">
                  <BookOpen className="h-7 w-7 text-blue-600" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold">
                  Mini <span className="text-gradient">Blog</span>
                </h1>
              </div>
              <p className="text-gray-600 mt-2 text-lg">
                Discover interesting stories and share your thoughts
              </p>
            </div>

            {/* Enhanced Search Bar */}
            <div className="w-full md:w-auto flex items-center">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all shadow-sm bg-white/90 backdrop-blur-sm"
                />
                <Search className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>

              <Link
                to="/create"
                className="ml-4 flex items-center bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-full transition-all shadow-md hover:shadow-lg"
              >
                <Plus className="h-5 w-5 mr-2" />
                <span className="hidden md:inline">New Blog</span>
              </Link>
            </div>
          </div>

          {/* Categories Navigation */}
          <div className="flex flex-wrap gap-2 mb-6 mt-8 justify-center md:justify-start">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  category === activeCategory
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                }`}
              >
                {category}
              </button>
            ))}

            <Link
              to="/categories"
              className="px-5 py-2 rounded-full text-sm font-medium bg-white text-blue-600 border border-blue-200 hover:bg-blue-50 transition-all flex items-center"
            >
              <Filter className="h-3.5 w-3.5 mr-1" />
              View All Categories
            </Link>
          </div>
        </div>
      </header>

      {/* Blog List Section */}
      <main className="max-w-7xl mx-auto px-4 pb-20">
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <PenLine className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              No blogs found
            </h3>
            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              Try adjusting your search or create a new blog to share your
              thoughts with the world
            </p>
            <Link
              to="/create"
              className="inline-flex items-center mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Create New Blog
            </Link>
          </div>
        ) : (
          <>
            {/* Featured Blog - Show the most recent blog prominently */}
            {filteredBlogs.length > 0 && (
              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6 flex items-center">
                  <Bookmark className="mr-2 h-6 w-6 text-blue-600" />
                  Featured Post
                </h2>

                <Link
                  to={`/post/${filteredBlogs[0].id}`}
                  className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all border border-gray-100 group"
                >
                  <div className="md:flex">
                    <div className="md:w-2/5 h-64 md:h-auto">
                      <img
                        src={filteredBlogs[0].coverImage}
                        alt={filteredBlogs[0].title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 md:w-3/5 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start mb-3">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getCategoryColor(
                              filteredBlogs[0].category
                            )}`}
                          >
                            {filteredBlogs[0].category}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {filteredBlogs[0].createdAt}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                          {filteredBlogs[0].title}
                        </h3>

                        <p className="text-gray-600 mb-6 line-clamp-3">
                          {getSnippet(filteredBlogs[0].content)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            {filteredBlogs[0].author.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3">
                            <span className="text-sm font-medium text-gray-800">
                              {filteredBlogs[0].author}
                            </span>
                            <p className="text-xs text-gray-500">
                              {filteredBlogs[0].readTime}
                            </p>
                          </div>
                        </div>
                        <span className="text-blue-600 flex items-center group-hover:underline">
                          Read article <ChevronRight className="ml-1 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* All other blogs */}
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Layout className="mr-2 h-6 w-6 text-blue-600" />
              All Posts
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBlogs.slice(1).map((blog, index) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-fade-in hover-lift border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Link to={`/post/${blog.id}`} className="group">
                    <div className="h-48 overflow-hidden relative">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                      <div className="absolute bottom-2 right-2">
                        <span className="bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                          {blog.readTime}
                        </span>
                      </div>
                    </div>
                  </Link>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getCategoryColor(
                          blog.category
                        )}`}
                      >
                        {blog.category}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {blog.createdAt}
                      </span>
                    </div>

                    <Link to={`/post/${blog.id}`}>
                      <h2 className="text-xl font-bold mb-2 text-gray-800 hover:text-blue-600 transition-colors line-clamp-2">
                        {blog.title}
                      </h2>
                    </Link>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {getSnippet(blog.content)}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium shadow-sm">
                          {blog.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                          {blog.author}
                        </span>
                      </div>
                      <Link
                        to={`/post/${blog.id}`}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors flex items-center hover:underline"
                      >
                        Read more
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p>
            Mini Blog App © {new Date().getFullYear()} | Your personal blogging
            platform
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
