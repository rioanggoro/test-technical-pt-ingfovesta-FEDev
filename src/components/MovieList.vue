<script setup>
import { computed, ref, watch } from 'vue';
import { ROUTES } from '../constants';
import { useMovieStore } from '../stores/movieStore';
import MovieListItem from './MovieListItem.vue';

const movieStore = useMovieStore();
const searchQuery = ref('');

watch(searchQuery, (newQuery) => {
  movieStore.setSearchQuery(newQuery);
});

const filteredMovies = computed(() => movieStore.filteredMovies);
const hasMovies = computed(() => movieStore.movies.length > 0);
const hasSearchResults = computed(() => filteredMovies.value.length > 0);

const handleReset = () => {
  if (
    confirm('This will reset all movies to the original data. Are you sure?')
  ) {
    movieStore.resetMovies();
    searchQuery.value = '';
  }
};
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <header class="mb-8">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-3xl font-bold text-gray-900">🎬 Movie Collection</h1>
        </div>

        <div class="relative">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search movies..."
            class="w-full px-4 py-3 pl-12 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <div class="absolute left-4 top-1/2 -translate-y-1/2">
            <svg
              class="w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </header>

      <main>
        <div v-if="hasSearchResults" class="space-y-4 mb-8">
          <MovieListItem
            v-for="movie in filteredMovies"
            :key="movie.id"
            :movie="movie"
          />
        </div>

        <div
          v-else-if="searchQuery && !hasSearchResults"
          class="text-center py-12"
        >
          <div class="text-6xl mb-4 opacity-50">🔍</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">
            No results found
          </h3>
          <p class="text-gray-500">Try adjusting your search terms</p>
        </div>

        <div v-else-if="!hasMovies" class="text-center py-12">
          <div class="text-6xl mb-4 opacity-50">🎭</div>
          <h3 class="text-lg font-medium text-gray-900 mb-2">No movies yet</h3>
          <p class="text-gray-500">Add your first movie to get started</p>
        </div>
      </main>

      <div class="fixed bottom-8 right-8">
        <router-link
          :to="ROUTES.MOVIE_CREATE"
          class="group flex items-center justify-center w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
          aria-label="Add new movie"
        >
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>
