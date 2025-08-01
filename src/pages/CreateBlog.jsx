import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import {
  PenLine,
  User,
  FileText,
  Image,
  Tag,
  ArrowLeft,
  Send,
} from "lucide-react";
import { addBlog } from "../utils/storage";

/**
 * CreateBlog component - Form for creating new blog posts
 * @returns {JSX.Element} CreateBlog component
 */
function CreateBlog() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  /**
   * Blog categories
   * @constant {Array<string>}
   */
  const CATEGORIES = [
    "Technology",
    "Travel",
    "Food",
    "Lifestyle",
    "Health",
    "Fashion",
    "Education",
    "Sports",
    "Business",
    "Other",
  ];

  /**
   * Form submission handler
   * @param {Object} data - Form data
   */
  const onSubmit = (data) => {
    try {
      // Calculate read time based on content length (1000 chars ~= 1 min)
      const readTimeMinutes = Math.ceil(data.content.length / 1000);

      // Add blog to localStorage
      const newBlog = addBlog({
        ...data,
        readTime: `${readTimeMinutes} min read`,
      });

      console.log("New blog created:", newBlog);
      alert("Blog post created successfully!");
      navigate(`/post/${newBlog.id}`);
    } catch (error) {
      console.error("Error creating blog:", error);
      alert("Failed to create blog post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-10">
          <div className="flex items-center gap-2 mb-8">
            <PenLine className="w-6 h-6 text-blue-600" />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
              Create New Blog Post
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Title
              </label>
              <div className="relative">
                <input
                  id="title"
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  } 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10`}
                  placeholder="Enter blog title"
                  {...register("title", { required: "Title is required" })}
                />
                <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              </div>
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Content Field */}
            <div>
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Blog Content
              </label>
              <div className="relative">
                <textarea
                  id="content"
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.content ? "border-red-500" : "border-gray-300"
                  } 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10`}
                  placeholder="Write your blog post here..."
                  {...register("content", { required: "Content is required" })}
                />
                <PenLine className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              </div>
              {errors.content && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.content.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Author Field */}
              <div>
                <label
                  htmlFor="author"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Author Name
                </label>
                <div className="relative">
                  <input
                    id="author"
                    type="text"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.author ? "border-red-500" : "border-gray-300"
                    } 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10`}
                    placeholder="Your name"
                    {...register("author", {
                      required: "Author name is required",
                    })}
                  />
                  <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                </div>
                {errors.author && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.author.message}
                  </p>
                )}
              </div>

              {/* Category Field */}
              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.category ? "border-red-500" : "border-gray-300"
                    } 
                      focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10 appearance-none bg-white`}
                    {...register("category", {
                      required: "Please select a category",
                    })}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category, index) => (
                      <option key={index} value={category.toLowerCase()}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <Tag className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                  <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {errors.category && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.category.message}
                  </p>
                )}
              </div>
            </div>

            {/* Cover Image URL Field */}
            <div>
              <label
                htmlFor="coverImage"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Cover Image URL
              </label>
              <div className="relative">
                <input
                  id="coverImage"
                  type="text"
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.coverImage ? "border-red-500" : "border-gray-300"
                  } 
                    focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10`}
                  placeholder="https://example.com/image.jpg"
                  {...register("coverImage", {
                    required: "Cover image URL is required",
                    pattern: {
                      value:
                        /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/i,
                      message: "Please enter a valid image URL",
                    },
                  })}
                />
                <Image className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              </div>
              {errors.coverImage && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.coverImage.message}
                </p>
              )}
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors 
                  flex items-center justify-center font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Send className="w-5 h-5 mr-2" />
                Publish Blog Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateBlog;
