import React from "react";
import { Trash2 } from "lucide-react";

/**
 * CommentItem component to display an individual comment
 * @param {Object} props - Component props
 * @param {Object} props.comment - Comment data (author, content, createdAt)
 * @param {boolean} props.isAuthor - Whether current user is the blog author
 * @param {Function} props.onDelete - Function to call when deleting comment
 * @returns {JSX.Element} CommentItem component
 */
function CommentItem({ comment, isAuthor, onDelete }) {
  // Format date to be more readable
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return (
        date.toLocaleDateString() +
        " at " +
        date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      );
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 py-4 last:border-0">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
            {comment.author.charAt(0).toUpperCase()}
          </div>
          <div className="ml-2">
            <p className="font-medium text-gray-800 dark:text-gray-200">
              {comment.author}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </p>
          </div>
        </div>

        {isAuthor && (
          <button
            onClick={() => onDelete(comment.id)}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Delete comment"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="pl-10 text-gray-700 dark:text-gray-300">
        {comment.content}
      </div>
    </div>
  );
}

export default CommentItem;
