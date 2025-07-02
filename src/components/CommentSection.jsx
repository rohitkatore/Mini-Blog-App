import React from "react";
import { MessageCircle, Trash2 } from "lucide-react";
import CommentForm from "./CommentForm";

/**
 * Format a date to a readable string
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

/**
 * Component to display comments and comment form
 * @param {Object} props - Component props
 * @param {Array} props.comments - Array of comments
 * @param {Function} props.onAddComment - Function called when a comment is added
 * @param {Function} props.onDeleteComment - Function called when a comment is deleted
 * @returns {JSX.Element} Comment section component
 */
function CommentSection({ comments = [], onAddComment, onDeleteComment }) {
  return (
    <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <MessageCircle className="w-6 h-6 mr-2 text-blue-600 dark:text-blue-400" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h2>

      {/* Add new comment */}
      <div className="mb-8">
        <CommentForm onSubmit={onAddComment} />
      </div>

      {/* Comment list */}
      {comments && comments.length > 0 ? (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg border border-gray-100 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                    {comment.author.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                      {comment.author}
                    </span>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteComment(comment.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  aria-label="Delete comment"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-2 text-gray-700 dark:text-gray-300">
                <p>{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
          <p className="text-gray-500 dark:text-gray-400">
            Be the first to share your thoughts on this post!
          </p>
        </div>
      )}
    </div>
  );
}

export default CommentSection;
