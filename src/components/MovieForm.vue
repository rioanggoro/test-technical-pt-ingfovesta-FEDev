<script setup>
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useMovieStore } from '../stores/movieStore';

const store = useMovieStore();
const router = useRouter();
const route = useRoute();

const allGenres = [
  'Action',
  'Sci-Fi',
  'Animation',
  'Drama',
  'Horror',
  'Comedy',
  'Romance',
  'Thriller',
];

const movieForm = ref({
  id: null,
  title: '',
  director: '',
  summary: '',
  genres: [],
});

const isEditMode = computed(() => !!route.params.id);

onMounted(() => {
  if (isEditMode.value) {
    const movieData = store.getMovieById(route.params.id);
    if (movieData) {
      movieForm.value = { ...movieData };
    }
  }
});

const handleSubmit = () => {
  if (isEditMode.value) {
    store.updateMovie(movieForm.value);
  } else {
    store.addMovie(movieForm.value);
  }
  router.push('/');
};

const handleDelete = () => {
  if (confirm('Are you sure you want to delete this movie?')) {
    store.deleteMovie(movieForm.value.id);
    router.push('/');
  }
};
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"
  >
    <div class="max-w-md mx-auto px-4 py-6 md:px-6 lg:max-w-lg lg:py-8">
      <div class="mb-4">
        <button
          @click="router.push('/')"
          class="flex items-center text-white hover:text-cyan-600 transition-colors duration-200"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            ></path>
          </svg>
          Back to Movies
        </button>
      </div>

      <div
        class="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-6 md:p-8"
      >
        <div class="flex justify-between items-center mb-6">
          <h1
            class="text-lg md:text-lg font-semibold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent"
          >
            {{ isEditMode ? 'Edit Movie' : 'Add New Movie' }}
          </h1>
          <div class="flex gap-2">
            <button
              v-if="isEditMode"
              @click.prevent="handleDelete"
              type="button"
              class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Delete Movie"
            >
              D
            </button>
            <button
              @click="handleSubmit"
              type="button"
              class="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-cyan-600 hover:to-blue-600 text-white rounded-xl flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
              title="Save Movie"
            >
              S
            </button>
          </div>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label
              for="title"
              class="block text-sm md:text-base font-semibold text-slate-700 mb-3"
              >Title</label
            >
            <input
              type="text"
              id="title"
              v-model="movieForm.title"
              required
              class="w-full px-5 py-4 md:py-5 bg-slate-50/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-inner"
              placeholder="Enter movie title"
            />
          </div>

          <div>
            <label
              for="director"
              class="block text-sm md:text-base font-semibold text-slate-700 mb-3"
              >Director</label
            >
            <input
              type="text"
              id="director"
              v-model="movieForm.director"
              required
              class="w-full px-5 py-4 md:py-5 bg-slate-50/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-inner"
              placeholder="Enter director name"
            />
          </div>

          <div>
            <label
              for="summary"
              class="block text-sm md:text-base font-semibold text-slate-700 mb-3"
            >
              Summary
              <span class="text-xs text-slate-500 ml-2"
                >({{ movieForm.summary.length }}/100)</span
              >
            </label>
            <textarea
              id="summary"
              v-model="movieForm.summary"
              maxlength="100"
              rows="4"
              class="w-full px-5 py-4 bg-slate-50/70 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-all duration-300 text-slate-700 placeholder-slate-400 resize-none shadow-inner"
              placeholder="Enter movie summary..."
            ></textarea>
          </div>

          <div>
            <label
              class="block text-sm md:text-base font-semibold text-slate-700 mb-4"
              >Genres</label
            >
            <div class="grid grid-cols-2 gap-3">
              <label
                v-for="genre in allGenres"
                :key="genre"
                class="flex items-center p-4 bg-slate-50/50 rounded-2xl border border-slate-200 cursor-pointer hover:bg-cyan-50/50 hover:border-cyan-300 transition-all duration-300 group"
                :class="{
                  'bg-cyan-100/70 border-cyan-400 shadow-md':
                    movieForm.genres.includes(genre),
                }"
              >
                <input
                  type="checkbox"
                  :value="genre"
                  v-model="movieForm.genres"
                  class="sr-only"
                />
                <div
                  class="w-5 h-5 rounded-lg border-2 mr-3 flex items-center justify-center transition-all duration-200"
                  :class="
                    movieForm.genres.includes(genre)
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-500 border-cyan-500 shadow-sm'
                      : 'border-slate-300 group-hover:border-cyan-400'
                  "
                >
                  <svg
                    v-if="movieForm.genres.includes(genre)"
                    class="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                </div>
                <span
                  class="text-sm md:text-base font-medium transition-colors duration-200"
                  :class="
                    movieForm.genres.includes(genre)
                      ? 'text-cyan-700'
                      : 'text-slate-700 group-hover:text-cyan-600'
                  "
                >
                  {{ genre }}
                </span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
