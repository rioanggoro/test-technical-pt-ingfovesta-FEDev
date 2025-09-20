import { defineStore } from 'pinia';
import { computed, ref } from 'vue';
import { STORAGE_KEYS } from '../constants';
import initialMovies from '../data/data';

const loadMoviesFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.MOVIES);
    return stored ? JSON.parse(stored) : initialMovies;
  } catch (error) {
    console.error('Failed to load movies from storage:', error);
    return initialMovies;
  }
};

const saveMoviesToStorage = (movies) => {
  try {
    localStorage.setItem(STORAGE_KEYS.MOVIES, JSON.stringify(movies));
  } catch (error) {
    console.error('Failed to save movies to storage:', error);
  }
};

const generateId = () =>
  `movie_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export const useMovieStore = defineStore('movies', () => {
  const movies = ref(loadMoviesFromStorage());
  const searchQuery = ref('');

  const filteredMovies = computed(() => {
    if (!searchQuery.value.trim()) return movies.value;

    const query = searchQuery.value.toLowerCase().trim();
    return movies.value.filter(
      (movie) =>
        movie.title.toLowerCase().includes(query) ||
        movie.director.toLowerCase().includes(query) ||
        movie.genres.some((genre) => genre.toLowerCase().includes(query)) ||
        (movie.summary && movie.summary.toLowerCase().includes(query))
    );
  });

  const getMovieById = (id) => {
    return movies.value.find((movie) => movie.id === id);
  };

  const addMovie = (movieData) => {
    const newMovie = {
      id: generateId(),
      title: movieData.title?.trim() || '',
      director: movieData.director?.trim() || '',
      summary: movieData.summary?.trim() || '',
      genres: Array.isArray(movieData.genres) ? movieData.genres : [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    movies.value.unshift(newMovie);
    saveMoviesToStorage(movies.value);
    return newMovie;
  };

  const updateMovie = (updatedMovie) => {
    const index = movies.value.findIndex(
      (movie) => movie.id === updatedMovie.id
    );
    if (index === -1) return false;

    movies.value[index] = {
      ...updatedMovie,
      updatedAt: new Date().toISOString(),
    };
    saveMoviesToStorage(movies.value);
    return true;
  };

  const deleteMovie = (id) => {
    const index = movies.value.findIndex((movie) => movie.id === id);
    if (index === -1) return false;

    movies.value.splice(index, 1);
    saveMoviesToStorage(movies.value);
    return true;
  };

  const resetMovies = () => {
    movies.value = [...initialMovies];
    saveMoviesToStorage(movies.value);
  };

  const setSearchQuery = (query) => {
    searchQuery.value = query;
  };

  return {
    movies: computed(() => movies.value),
    searchQuery: computed(() => searchQuery.value),
    filteredMovies,
    getMovieById,
    addMovie,
    updateMovie,
    deleteMovie,
    resetMovies,
    setSearchQuery,
  };
});
