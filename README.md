# Mini-Blogging-App

A lightweight, responsive blogging platform built with React that allows users to create, read, edit, and categorize blog posts. This application uses local storage to persist data between sessions, making it perfect for demonstration purposes or local development.

![Mini Blog App Screenshot](https://via.placeholder.com/800x400?text=Mini+Blog+App+Screenshot)

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Create and Edit Posts**: Write new blog posts with a simple, intuitive interface
- **Categories System**: Organize and filter posts by categories
- **Search Functionality**: Search across all posts by title, content, or category
- **Dark/Light Mode**: Toggle between dark and light themes
- **Local Storage**: Data persists between browser sessions using localStorage
- **Featured Posts**: Showcase important posts at the top of the home page
- **Reading Time**: Automatic calculation of estimated reading time for each article
- **Share Posts**: Quick URL copying for sharing articles

## Technologies Used

- React.js
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- Local Storage API for data persistence
- React Hook Form for form management

## Getting Started

### Prerequisites

- Node.js (version 14.0.0 or later)
- npm (version 6.0.0 or later) or yarn

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/Mini-Blogging-App.git
   cd Mini-Blogging-App
   ```

2. Install dependencies:

   ```
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```
   npm start
   # or
   yarn start
   ```

4. Open your browser and navigate to `http://localhost:3000`

## Usage Guide

### Creating a New Blog Post

1. Click on the "New Blog" button in the header
2. Fill in the blog title, content, author name, and select a category
3. Add a cover image URL
4. Click "Publish Blog Post" to save your blog

### Browsing Blog Posts

- **Home Page**: Features the most recent blog post and lists all other posts below
- **Categories**: Filter posts by clicking on category tags or visit the Categories page
- **Search**: Use the search box to find posts by title, content, or category

### Managing Blog Posts

- **Edit**: Click the edit icon on a blog post to modify its content
- **Delete**: Remove a blog post from the edit page
- **Share**: Copy the post URL to share with others

## Project Structure

```
Mini-Blogging-App/
├── src/
│   ├── components/         # Reusable UI components
│   ├── context/            # Context providers (ThemeContext)
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Home page with blog listings
│   │   ├── CreateBlog.jsx  # Create new blog form
│   │   ├── EditBlog.jsx    # Edit existing blog
│   │   ├── ViewBlog.jsx    # Blog post detail view
│   │   └── CategoriesBlog.jsx # Browse blogs by category
│   ├── utils/              # Utility functions
│   │   └── storage.js      # Local storage operations
│   ├── App.jsx             # Main app component with routes
│   └── index.js            # Entry point
├── public/                 # Static assets
└── package.json            # Project dependencies and scripts
```

## Dark Mode

The app includes a dark mode toggle that persists user preference between sessions. Click the sun/moon icon in the header to switch between light and dark themes.

## Custom Styling

The app uses Tailwind CSS for styling with a custom color scheme. The gradient background and card designs create a modern, clean aesthetic.

## License

[MIT License](LICENSE)

## Acknowledgements

- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Lucide Icons](https://lucide.dev/)
- [React Router](https://reactrouter.com/)
- [React Hook Form](https://react-hook-form.com/)

---

Created by [Your Name] | [Your Website/GitHub]
