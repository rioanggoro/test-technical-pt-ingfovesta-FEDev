<script setup>
import { computed, ref } from 'vue';
import { useMovieStore } from '../stores/movieStore';
import MovieListItem from './MovieListItem.vue';

const movieStore = useMovieStore();

const searchQuery = ref('');
const filteredMovies = computed(() => {
  if (!searchQuery.value) {
    return movieStore.movies;
  }
  return movieStore.movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});
</script>

<template>
  <div class="max-w-4xl mx-auto p-4 md:p-8">
    <h1 class="text-4xl font-bold text-gray-800 mb-6">Movies Collection</h1>

    <div
      class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4"
    >
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Search by title..."
        class="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        class="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
        <span>Add Movie</span>
      </button>
    </div>

    <div class="bg-white shadow-md rounded-lg overflow-hidden">
      <div v-if="filteredMovies.length > 0">
        <MovieListItem
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <div v-else class="text-center p-12 text-gray-500">
        <p>No movies found. Try a different search or add a new one!</p>
      </div>
    </div>
  </div>
</template>
