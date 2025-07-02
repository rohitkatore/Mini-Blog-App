import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  User,
  Tag,
  Edit,
  Trash2,
  Share2,
  Clock,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  MessageCircle,
} from "lucide-react";
import {
  getBlogById,
  getBlogs,
  addComment,
  deleteComment,
} from "../utils/storage";
import CommentItem from "../components/CommentItem";
import CommentForm from "../components/CommentForm";

/**
 * ViewBlog component - Displays a single blog post
 * @returns {JSX.Element} ViewBlog component
 */
function ViewBlog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPrev, setNextPrev] = useState({ next: null, prev: null });
  const [copied, setCopied] = useState(false);

  // Fetch blog data on component mount or id change
  useEffect(() => {
    const fetchBlog = () => {
      setLoading(true);

      // Simulate API delay
      setTimeout(() => {
        try {
          const allBlogs = getBlogs();
          const foundBlog = getBlogById(parseInt(id, 10));
          setBlog(foundBlog);

          // Find next and previous blogs for navigation
          if (foundBlog) {
            const currentIndex = allBlogs.findIndex(
              (b) => b.id === foundBlog.id
            );
            setNextPrev({
              prev: currentIndex > 0 ? allBlogs[currentIndex - 1] : null,
              next:
                currentIndex < allBlogs.length - 1
                  ? allBlogs[currentIndex + 1]
                  : null,
            });
          }
        } catch (error) {
          console.error("Error fetching blog:", error);
        } finally {
          setLoading(false);
        }
      }, 300);
    };

    fetchBlog();
  }, [id]);

  /**
   * Copy current URL to clipboard for sharing
   */
  const shareUrl = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  /**
   * Format date to be more readable
   * @param {string} dateString - ISO date string
   * @returns {string} Formatted date
   */
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  /**
   * Function to get category color
   * @param {string} category - Blog category
   * @returns {string} CSS classes for category styling
   */
  const getCategoryColor = (category) => {
    const colors = {
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

    return colors[category?.toLowerCase()] || colors.other;
  };

  // Function to render markdown-like content with proper formatting
  const renderContent = (content) => {
    // Split by paragraphs
    const paragraphs = content.split("\n\n");

    return paragraphs.map((paragraph, index) => {
      // Handle headings (## Heading format)
      if (paragraph.startsWith("## ")) {
        return (
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {paragraph.substring(3)}
          </h2>
        );
      }
      // Handle sub-headings (### Heading format)
      else if (paragraph.startsWith("### ")) {
        return (
          <h3 key={index} className="text-xl font-bold mt-6 mb-3">
            {paragraph.substring(4)}
          </h3>
        );
      }
      // Handle lists
      else if (paragraph.includes("- **")) {
        const listItems = paragraph.split("- ");
        return (
          <ul key={index} className="list-disc pl-5 my-4 space-y-2">
            {listItems
              .filter((item) => item.trim())
              .map((item, i) => (
                <li key={i} className="text-gray-700">
                  {item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")}
                </li>
              ))}
          </ul>
        );
      }
      // Handle numbered lists
      else if (/^\d\./.test(paragraph)) {
        const listItems = paragraph.split(/\d\.\s/);
        return (
          <ol key={index} className="list-decimal pl-5 my-4 space-y-2">
            {listItems
              .filter((item) => item.trim())
              .map((item, i) => (
                <li key={i} className="text-gray-700">
                  {item}
                </li>
              ))}
          </ol>
        );
      }
      // Handle code blocks
      else if (paragraph.includes("```")) {
        if (paragraph.includes("```jsx")) {
          const code = paragraph.split("```jsx")[1].split("```")[0];
          return (
            <div
              key={index}
              className="bg-gray-800 text-white p-4 rounded-lg my-4 overflow-x-auto"
            >
              <code className="block whitespace-pre">{code}</code>
            </div>
          );
        }
        return null;
      }
      // Regular paragraphs
      else {
        // Bold text formatting
        let formattedText = paragraph.replace(
          /\*\*(.*?)\*\*/g,
          "<strong>$1</strong>"
        );

        return (
          <p
            key={index}
            className="text-gray-700 mb-4"
            dangerouslySetInnerHTML={{ __html: formattedText }}
          />
        );
      }
    });
  };

  // Handle adding a new comment
  const handleAddComment = (commentData) => {
    try {
      const updatedBlog = addComment(parseInt(id, 10), commentData);
      if (updatedBlog) {
        setBlog(updatedBlog);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Failed to add comment. Please try again.");
    }
  };

  // Handle deleting a comment
  const handleDeleteComment = (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        const updatedBlog = deleteComment(parseInt(id, 10), commentId);
        if (updatedBlog) {
          setBlog(updatedBlog);
        }
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Failed to delete comment. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-10 text-center">
          <div className="w-20 h-20 bg-red-50 rounded-full mx-auto flex items-center justify-center mb-6">
            <Bookmark className="h-10 w-10 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            The blog post you're looking for doesn't seem to exist or has been
            removed.
          </p>
          <Link
            to="/"
            className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Enhanced Navigation bar */}
      <nav className="py-4 px-4 bg-white shadow-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center text-blue-600 hover:text-blue-800 transition-colors group"
          >
            <div className="bg-blue-50 p-1.5 rounded-full group-hover:bg-blue-100 transition-colors mr-2">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <span className="font-medium">Back to Home</span>
          </Link>

          <div className="flex space-x-3">
            <button
              onClick={shareUrl}
              className={`p-2 rounded-full transition-colors flex items-center ${
                copied
                  ? "bg-green-100 text-green-600"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
              title="Share blog"
            >
              <Share2 className="w-5 h-5" />
              {copied && (
                <span className="ml-1 text-xs font-medium">Copied!</span>
              )}
            </button>
            <Link
              to={`/edit/${blog.id}`}
              className="p-2 rounded-full hover:bg-blue-50 transition-colors text-blue-600"
              title="Edit blog"
            >
              <Edit className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Blog header with enhanced styling */}
      <header className="pt-10 pb-8 px-4 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(
                blog.category
              )}`}
            >
              {blog.category}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              {formatDate(blog.createdAt)}
            </span>
            <span className="text-gray-500 text-sm flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {blog.readTime}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-lg font-medium shadow-sm">
              {blog.author.charAt(0).toUpperCase()}
            </div>
            <div className="ml-3">
              <div className="text-gray-800 font-medium text-lg">
                {blog.author}
              </div>
              <div className="text-gray-500 text-sm flex items-center">
                <User className="w-3 h-3 mr-1" />
                Author
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Cover image with enhanced styling */}
      <div className="px-4 mb-8 -mt-1">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-xl overflow-hidden shadow-lg h-64 md:h-[500px]">
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Blog content with enhanced styling */}
      <main className="px-4 pb-16">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-6 md:p-10">
          <article className="prose prose-lg max-w-none">
            {renderContent(blog.content)}
          </article>

          {/* Tags section */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center flex-wrap gap-2">
              <Tag className="w-5 h-5 text-gray-500 mr-2" />
              {["AI", "Technology", "Future", "Innovation", "Ethics"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm hover:bg-gray-200 cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* Comments Section */}
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h3 className="text-xl font-bold mb-6 flex items-center text-gray-800">
              <MessageCircle className="mr-2 h-5 w-5 text-blue-600" />
              Comments{" "}
              {blog.comments?.length > 0 && `(${blog.comments.length})`}
            </h3>

            {/* Comment List */}
            <div className="mb-8">
              {!blog.comments || blog.comments.length === 0 ? (
                <div className="text-center py-8 text-gray-500 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-2 divide-y divide-gray-100 dark:divide-gray-800">
                  {blog.comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      isAuthor={
                        blog.author.toLowerCase() ===
                        comment.author.toLowerCase()
                      }
                      onDelete={handleDeleteComment}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Comment Form */}
            <CommentForm onSubmit={handleAddComment} />
          </div>

          {/* Blog navigation */}
          <div className="mt-12 border-t border-gray-200 pt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextPrev.prev && (
              <Link
                to={`/post/${nextPrev.prev.id}`}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center text-gray-500 text-sm mb-2">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous Article
                </div>
                <h4 className="font-semibold text-gray-800 group-hover:text-blue-600 line-clamp-1">
                  {nextPrev.prev.title}
                </h4>
              </Link>
            )}

            {nextPrev.next && (
              <Link
                to={`/post/${nextPrev.next.id}`}
                className={`p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group ${
                  !nextPrev.prev ? "md:col-start-2" : ""
                }`}
              >
                <div className="flex items-center justify-end text-gray-500 text-sm mb-2">
                  Next Article
                  <ChevronRight className="h-4 w-4 ml-1" />
                </div>
                <h4 className="font-semibold text-gray-800 text-right group-hover:text-blue-600 line-clamp-1">
                  {nextPrev.next.title}
                </h4>
              </Link>
            )}
          </div>
        </div>
      </main>

      {/* Action buttons (mobile optimized) - Enhanced */}
      <div className="fixed bottom-6 right-6 md:hidden">
        <div className="flex flex-col space-y-3">
          <Link
            to={`/edit/${blog.id}`}
            className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-5 h-5 text-white" />
          </Link>
          <button
            onClick={shareUrl}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              copied ? "bg-green-600" : "bg-gray-700 hover:bg-gray-800"
            }`}
          >
            <Share2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;
