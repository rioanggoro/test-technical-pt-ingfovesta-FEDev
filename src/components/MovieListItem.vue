<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

defineProps({
  movie: {
    type: Object,
    required: true,
  },
});

const handleItemClick = (movieId) => {
  router.push(`/movies/edit/${movieId}`);
};
</script>

<template>
  <div
    @click="handleItemClick(movie.id)"
    class="group relative bg-white/60 backdrop-blur-sm hover:bg-white/80 rounded-2xl p-4 md:p-5 border border-slate-200/50 hover:border-cyan-300/50 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
  >
    <!-- Subtle hover gradient overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-r from-cyan-50/0 to-blue-50/0 group-hover:from-cyan-50/30 group-hover:to-blue-50/30 rounded-2xl transition-all duration-300"
    ></div>

    <div class="relative z-10">
      <div class="flex justify-between items-start mb-3">
        <div class="flex-1">
          <h3
            class="text-lg md:text-xl font-bold text-slate-800 group-hover:text-cyan-700 transition-colors duration-300 mb-1"
          >
            {{ movie.title }}
          </h3>
          <p class="text-sm md:text-base text-slate-600 font-medium">
            {{ movie.director }}
          </p>
        </div>

        <!-- Subtle arrow indicator -->
        <div
          class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3"
        >
          <svg
            class="w-5 h-5 text-cyan-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 5l7 7-7 7"
            ></path>
          </svg>
        </div>
      </div>

      <div class="flex flex-wrap gap-2">
        <span
          v-for="genre in movie.genres"
          :key="genre"
          class="inline-flex items-center px-3 py-1.5 rounded-xl text-xs md:text-sm font-semibold transition-all duration-200 hover:scale-105"
          :class="{
            'bg-gradient-to-r from-red-100 to-red-200 text-red-700 hover:from-red-200 hover:to-red-300':
              genre === 'Action',
            'bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 hover:from-blue-200 hover:to-blue-300':
              genre === 'Sci-Fi',
            'bg-gradient-to-r from-pink-100 to-pink-200 text-pink-700 hover:from-pink-200 hover:to-pink-300':
              genre === 'Animation',
            'bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 hover:from-emerald-200 hover:to-emerald-300':
              genre === 'Drama',
            'bg-gradient-to-r from-gray-800 to-gray-900 text-white hover:from-gray-900 hover:to-black':
              genre === 'Horror',
            'bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-700 hover:from-yellow-200 hover:to-yellow-300':
              genre === 'Comedy',
            'bg-gradient-to-r from-rose-100 to-rose-200 text-rose-700 hover:from-rose-200 hover:to-rose-300':
              genre === 'Romance',
            'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-slate-200 hover:to-slate-300':
              genre === 'Thriller',
            'bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-700 hover:from-indigo-200 hover:to-indigo-300':
              ![
                'Action',
                'Sci-Fi',
                'Animation',
                'Drama',
                'Horror',
                'Comedy',
                'Romance',
                'Thriller',
              ].includes(genre),
          }"
        >
          {{ genre }}
        </span>
      </div>
    </div>
  </div>
</template>
