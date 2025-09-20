import { defineStore } from 'pinia';
import movies from '../data/data.js';

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: movies,
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
  },
});
