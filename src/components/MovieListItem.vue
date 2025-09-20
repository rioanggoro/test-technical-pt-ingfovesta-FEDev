<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { GENRE_COLORS, ROUTES } from '../constants';

const router = useRouter();

const props = defineProps({
  movie: {
    type: Object,
    required: true,
    validator: (movie) => {
      return (
        movie &&
        typeof movie.id === 'string' &&
        typeof movie.title === 'string' &&
        typeof movie.director === 'string' &&
        Array.isArray(movie.genres)
      );
    },
  },
});

const genreColorClass = (genre) => {
  return GENRE_COLORS[genre] || 'bg-gray-100 text-gray-700';
};

const handleClick = () => {
  router.push(`${ROUTES.MOVIE_EDIT}/${props.movie.id}`);
};

const formattedDate = computed(() => {
  if (!props.movie.updatedAt) return '';
  return new Date(props.movie.updatedAt).toLocaleDateString();
});
</script>

<template>
  <article
    @click="handleClick"
    class="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-300 transition-all cursor-pointer"
  >
    <div class="flex justify-between items-start mb-4">
      <div class="flex-1 min-w-0">
        <h3
          class="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors truncate"
        >
          {{ movie.title }}
        </h3>
        <p class="text-gray-600 mt-1">Directed by {{ movie.director }}</p>
        <p v-if="formattedDate" class="text-xs text-gray-400 mt-1">
          Updated {{ formattedDate }}
        </p>
      </div>

      <div class="opacity-0 group-hover:opacity-100 transition-opacity ml-4">
        <svg
          class="w-5 h-5 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </div>
    </div>

    <div v-if="movie.summary" class="text-sm text-gray-700 mb-4 line-clamp-2">
      {{ movie.summary }}
    </div>

    <div v-if="movie.genres?.length" class="flex flex-wrap gap-2">
      <span
        v-for="genre in movie.genres"
        :key="genre"
        :class="genreColorClass(genre)"
        class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
      >
        {{ genre }}
      </span>
    </div>
  </article>
</template>
