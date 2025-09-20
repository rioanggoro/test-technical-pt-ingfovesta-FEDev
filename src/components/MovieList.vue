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
  return movieStore.movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      movie.genres.some((genre) =>
        genre.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
  );
});
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"
  >
    <div class="max-w-md mx-auto px-4 py-6 md:px-6 lg:max-w-lg lg:py-8">
      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8"
      >
        <div
          class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8"
        >
          <h1
            class="text-2xl md:text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
          >
            Movies Collection
          </h1>
        </div>

        <div class="relative mb-8">
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search by title, director, or genre..."
            class="w-full px-5 py-4 md:py-5 bg-slate-50/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400 text-sm md:text-base shadow-inner"
          />
          <div class="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg
              class="w-5 h-5 md:w-6 md:h-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="space-y-3 md:space-y-4 mb-8">
          <div v-if="filteredMovies.length > 0">
            <MovieListItem
              v-for="movie in filteredMovies"
              :key="movie.id"
              :movie="movie"
            />
          </div>
          <div v-else class="text-center py-12 md:py-16">
            <div class="text-5xl md:text-6xl mb-4 opacity-60">🎬</div>
            <p class="text-slate-600 font-medium text-base md:text-lg mb-2">
              No movies found
            </p>
            <p class="text-slate-400 text-sm md:text-base">
              Try a different search or add a new movie!
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center mt-8">
        <router-link
          to="/movies/new"
          class="group relative w-16 h-16 md:w-18 md:h-18 bg-white hover:bg-blue-200 text-blue-500 hover:text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 border border-blue-200 hover:border-blue-200"
        >
          <div
            class="absolute inset-0 rounded-full bg-blue-100 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
          ></div>

          <svg
            class="w-7 h-7 md:w-8 md:h-8 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2.5"
              d="M12 4v16m8-8H4"
            ></path>
          </svg>
        </router-link>
      </div>
    </div>
  </div>
</template>
