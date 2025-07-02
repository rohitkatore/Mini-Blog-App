import React, { useState } from "react";
import { Send } from "lucide-react";

/**
 * CommentForm component for adding new comments
 * @param {Object} props - Component props
 * @param {Function} props.onSubmit - Function to call with new comment data
 * @returns {JSX.Element} CommentForm component
 */
function CommentForm({ onSubmit }) {
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate form
    const formErrors = {};
    if (!author.trim()) formErrors.author = "Name is required";
    if (!content.trim()) formErrors.content = "Comment is required";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Submit data and reset form
    onSubmit({ author, content });
    setAuthor("");
    setContent("");
    setErrors({});
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg"
    >
      <h3 className="text-lg font-medium mb-4 text-gray-800 dark:text-gray-200">
        Leave a Comment
      </h3>

      <div className="mb-4">
        <label
          htmlFor="comment-author"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Your Name
        </label>
        <input
          id="comment-author"
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.author
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          placeholder="Enter your name"
        />
        {errors.author && (
          <p className="text-red-500 text-xs mt-1">{errors.author}</p>
        )}
      </div>

      <div className="mb-4">
        <label
          htmlFor="comment-content"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Your Comment
        </label>
        <textarea
          id="comment-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={`w-full px-4 py-2 border rounded-lg ${
            errors.content
              ? "border-red-500"
              : "border-gray-300 dark:border-gray-600"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          placeholder="Write your comment here..."
          rows="3"
        ></textarea>
        {errors.content && (
          <p className="text-red-500 text-xs mt-1">{errors.content}</p>
        )}
      </div>

      <button
        type="submit"
        className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
      >
        <Send className="w-4 h-4 mr-2" />
        Submit Comment
      </button>
    </form>
  );
}

export default CommentForm;
