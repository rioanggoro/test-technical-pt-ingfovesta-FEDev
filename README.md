# Movie Collection App

A modern, responsive Vue.js application for managing your personal movie collection with full CRUD functionality and persistent storage.

## Features

- **Full CRUD Operations**: Create, read, update, and delete movies
- **Advanced Search**: Search by title, director, genre, or summary
- **Persistent Storage**: Data persists across browser sessions using localStorage
- **Responsive Design**: Optimized for both mobile and desktop devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Form Validation**: Comprehensive client-side validation
- **Genre Management**: Categorize movies with multiple genre support

## Tech Stack

- **Frontend Framework**: Vue.js 3 with Composition API
- **State Management**: Pinia with composition API pattern
- **Routing**: Vue Router 4 with lazy loading
- **Styling**: Tailwind CSS 4 with custom design system
- **Build Tool**: Vite for fast development and optimized builds
- **Code Quality**: ESLint configuration for consistent code style

## Project Structure

```
src/
├── components/          # Vue components
│   ├── MovieList.vue   # Main list view with search
│   ├── MovieListItem.vue # Individual movie card
│   └── MovieForm.vue   # Create/edit form
├── composables/        # Reusable composition functions
│   ├── useMovieForm.js # Form logic and validation
│   └── useMovieValidation.js # Validation rules
├── constants/          # Application constants
│   └── index.js       # Routes, colors, validation rules
├── data/              # Static data
│   └── data.js        # Initial movie data
├── router/            # Route configuration
│   └── index.js       # Vue Router setup
├── stores/            # Pinia stores
│   └── movieStore.js  # Movie state management
└── style.css          # Global styles and Tailwind config
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Usage

### Adding Movies

1. Click the "+" button on the main page
2. Fill in the movie details (title and director are required)
3. Select one or more genres
4. Add an optional summary (max 500 characters)
5. Click "Create Movie" to save

### Editing Movies

1. Click on any movie card from the list
2. Modify the desired fields
3. Click "Update Movie" to save changes
4. Use the "Delete" button to remove the movie

### Searching

- Use the search bar to filter movies by title, director, genre, or summary
- Search is case-insensitive and matches partial strings
- Results update in real-time as you type

## Data Persistence

The application uses browser localStorage to persist data across sessions. Movies are automatically saved when:

- Adding new movies
- Updating existing movies
- Deleting movies

## Architecture Decisions

### Composition API

Chose Vue 3's Composition API for better code organization, reusability, and TypeScript support.

### Pinia Store Pattern

Implemented Pinia with the composition API pattern for modern state management with better developer experience.

### Custom Composables

Created reusable composables for form logic and validation to promote code reuse and separation of concerns.

### Component Architecture

Designed components to be focused, reusable, and follow single responsibility principle.

### Responsive Design

Built mobile-first with Tailwind CSS for consistent, professional styling across all devices.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Optimizations

- Lazy loading of route components
- Efficient reactive state management
- Optimized bundle size with Vite
- Minimal re-renders with proper Vue reactivity

## Contributing

This project follows standard Vue.js development practices and coding conventions. All code is formatted and linted for consistency.
