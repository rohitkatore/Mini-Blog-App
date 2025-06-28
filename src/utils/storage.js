const STORAGE_KEY = "mini_blog_posts";

// Sample initial blog data
const initialBlogs = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    content:
      "React Hooks are a powerful feature that lets you use state and other React features without writing a class. In this tutorial, we'll explore the most common hooks like useState, useEffect, and useContext, with practical examples to get you started quickly.\n\nReact Hooks were introduced in React 16.8 as a way to use state and other React features without writing class components. They enable functional components to have access to stateful logic and lifecycle features that were previously only available in class components.\n\nLet's start with the most basic hook: useState. This hook allows you to add state to your functional components. Here's a simple example:\n\n```jsx\nimport React, { useState } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nNext, let's look at the useEffect hook. This hook lets you perform side effects in function components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in React classes, but unified into a single API.\n\n```jsx\nimport React, { useState, useEffect } from 'react';\n\nfunction Example() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    document.title = `You clicked ${count} times`;\n  });\n\n  return (\n    <div>\n      <p>You clicked {count} times</p>\n      <button onClick={() => setCount(count + 1)}>\n        Click me\n      </button>\n    </div>\n  );\n}\n```\n\nAnother powerful hook is useContext, which lets you subscribe to React context without introducing nesting.\n\n```jsx\nimport React, { useContext } from 'react';\n\nfunction ThemedButton() {\n  const theme = useContext(ThemeContext);\n  return (\n    <button style={{ background: theme.background, color: theme.foreground }}>\n      I am styled by theme context!\n    </button>\n  );\n}\n```\n\nThere are many other hooks available like useReducer, useCallback, useMemo, and useRef that solve specific problems. You can even create your own custom hooks to reuse stateful logic between components.\n\nHooks provide a more direct API to React concepts you already know: props, state, context, refs, and lifecycle. They make it possible to break complex components into smaller functions rather than forcing a split based on lifecycle methods.",
    author: "Jane Cooper",
    category: "technology",
    coverImage:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1470&auto=format&fit=crop",
    createdAt: "2023-10-15",
    readTime: "8 min read",
  },
  {
    id: 2,
    title: "The Art of Modern Web Design",
    content:
      "Modern web design is all about creating experiences that are both functional and delightful. This article covers the principles of user-centered design, accessibility considerations, and how to create designs that work across multiple devices.\n\nIn today's digital landscape, web design has evolved far beyond simply arranging elements on a page. Modern web design is a multidisciplinary approach that combines aesthetics with functionality, psychology with technology, and creativity with strategic thinking.\n\n## User-Centered Design\n\nAt the heart of modern web design is the user. Understanding your audience's needs, preferences, and behaviors is essential for creating meaningful experiences. User-centered design involves:\n\n1. **User Research**: Conducting interviews, surveys, and usability tests to understand your users.\n2. **Personas**: Creating fictional characters based on your research to represent different user types.\n3. **Journey Mapping**: Visualizing the entire user experience from initial contact to long-term engagement.\n4. **Iterative Testing**: Continuously gathering feedback and refining your design accordingly.\n\n## Accessibility Considerations\n\nDesigning for all users, including those with disabilities, is not just ethically important—it's often legally required. Key accessibility principles include:\n\n- **Semantic HTML**: Using appropriate HTML elements to provide meaning and structure.\n- **Color Contrast**: Ensuring text is readable against its background.\n- **Keyboard Navigation**: Making all functionality available without requiring a mouse.\n- **Alternative Text**: Providing descriptions for images and non-text content.\n- **ARIA Attributes**: Enhancing accessibility when standard HTML isn't sufficient.\n\n## Responsive Design\n\nWith users accessing websites from a variety of devices, responsive design has become non-negotiable. This approach ensures your website looks and functions well on any screen size by:\n\n- Using flexible grid layouts\n- Employing CSS media queries to apply different styles based on device characteristics\n- Implementing flexible images that scale appropriately\n- Prioritizing content for smaller screens",
    author: "Alex Morgan",
    category: "design",
    coverImage:
      "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1470&auto=format&fit=crop",
    createdAt: "2023-10-10",
    readTime: "10 min read",
  },
  {
    id: 3,
    title: "Exploring Japan's Hidden Temples",
    content:
      "Beyond the bustling streets of Tokyo and the familiar sights of Kyoto lies a Japan few travelers experience. Join me on a journey through ancient forest paths to discover temples that have stood for centuries, offering a glimpse into Japan's spiritual traditions.",
    author: "Hiroshi Yamamoto",
    category: "travel",
    coverImage:
      "https://images.unsplash.com/photo-1492571350019-22de08371fd3?q=80&w=1453&auto=format&fit=crop",
    createdAt: "2023-10-05",
    readTime: "12 min read",
  },
];

/**
 * Initialize localStorage with initial data if it doesn't exist
 * @returns {Array} The blogs from storage or initial data
 */
const initializeStorage = () => {
  const existingBlogs = localStorage.getItem(STORAGE_KEY);
  if (!existingBlogs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogs));
    return initialBlogs;
  }
  return JSON.parse(existingBlogs);
};

/**
 * Get all blogs from localStorage
 * @returns {Array} Array of blog objects
 */
export const getBlogs = () => {
  const blogs = localStorage.getItem(STORAGE_KEY);
  if (!blogs) {
    return initializeStorage();
  }
  return JSON.parse(blogs);
};

/**
 * Get a single blog by ID
 * @param {number} id - The blog ID to retrieve
 * @returns {Object|undefined} The blog object or undefined if not found
 */
export const getBlogById = (id) => {
  const blogs = getBlogs();
  return blogs.find((blog) => blog.id === parseInt(id));
};

/**
 * Add a new blog
 * @param {Object} blog - The blog data to add
 * @returns {Object} The new blog with generated ID
 */
export const addBlog = (blog) => {
  const blogs = getBlogs();
  // Generate a new ID
  const newId =
    blogs.length > 0 ? Math.max(...blogs.map((blog) => blog.id)) + 1 : 1;

  const newBlog = {
    ...blog,
    id: newId,
    createdAt: new Date().toISOString().split("T")[0],
  };

  const updatedBlogs = [...blogs, newBlog];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBlogs));
  return newBlog;
};

/**
 * Update an existing blog
 * @param {number} id - The ID of the blog to update
 * @param {Object} updatedBlog - The updated blog data
 * @returns {Object|null} The updated blog or null if not found
 */
export const updateBlog = (id, updatedBlog) => {
  const blogs = getBlogs();
  const index = blogs.findIndex((blog) => blog.id === parseInt(id));

  if (index !== -1) {
    blogs[index] = { ...blogs[index], ...updatedBlog };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
    return blogs[index];
  }
  return null;
};

/**
 * Delete a blog by ID
 * @param {number} id - The ID of the blog to delete
 * @returns {Array} The updated blogs array
 */
export const deleteBlog = (id) => {
  const blogs = getBlogs();
  const filteredBlogs = blogs.filter((blog) => blog.id !== parseInt(id));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredBlogs));
  return filteredBlogs;
};
