import { defineStore } from 'pinia';
import movies from '../data/data.js';

const loadMoviesFromStorage = () => {
  const stored = localStorage.getItem('movies');
  return stored ? JSON.parse(stored) : movies;
};

const saveMoviesToStorage = (movies) => {
  localStorage.setItem('movies', JSON.stringify(movies));
};

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: loadMoviesFromStorage(),
    searchQuery: '',
  }),

  getters: {
    filteredMovies: (state) => {
      if (!state.searchQuery) return state.movies;
      return state.movies.filter(
        (movie) =>
          movie.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
          movie.director
            .toLowerCase()
            .includes(state.searchQuery.toLowerCase()) ||
          movie.genres.some((genre) =>
            genre.toLowerCase().includes(state.searchQuery.toLowerCase())
          )
      );
    },
  },

  actions: {
    setSearchQuery(query) {
      this.searchQuery = query;
    },

    getMovieById(id) {
      return this.movies.find((movie) => movie.id === id);
    },

    addMovie(movieData) {
      const newMovie = {
        ...movieData,
        id: Date.now().toString(),
      };
      this.movies.push(newMovie);
      saveMoviesToStorage(this.movies);
    },

    updateMovie(updatedMovie) {
      const index = this.movies.findIndex(
        (movie) => movie.id === updatedMovie.id
      );
      if (index !== -1) {
        this.movies[index] = updatedMovie;
        saveMoviesToStorage(this.movies);
      }
    },

    deleteMovie(id) {
      const index = this.movies.findIndex((movie) => movie.id === id);
      if (index !== -1) {
        this.movies.splice(index, 1);
        saveMoviesToStorage(this.movies);
      }
    },

    resetMovies() {
      this.movies = [...movies];
      saveMoviesToStorage(this.movies);
    },
  },
});
