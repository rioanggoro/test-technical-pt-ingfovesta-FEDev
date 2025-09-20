<script setup>
import { onMounted } from 'vue';
import { useMovieForm } from '../composables/useMovieForm';
import { GENRE_OPTIONS, VALIDATION } from '../constants';

const {
  movieForm,
  isEditMode,
  isLoading,
  isFormValid,
  validationErrors,
  initializeForm,
  handleSubmit,
  handleDelete,
  navigateBack,
} = useMovieForm();

onMounted(() => {
  initializeForm();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <header class="mb-8">
        <button
          @click="navigateBack"
          class="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
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
            />
          </svg>
          Back to Movies
        </button>

        <div class="flex items-center justify-between">
          <h1 class="text-3xl font-bold text-gray-900">
            {{ isEditMode ? 'Edit Movie' : 'Add New Movie' }}
          </h1>

          <div v-if="isEditMode" class="flex gap-2">
            <button
              @click="handleDelete"
              :disabled="isLoading"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white rounded-lg font-medium transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </header>

      <form
        @submit.prevent="handleSubmit"
        class="bg-white rounded-xl border border-gray-200 p-8"
      >
        <div
          v-if="validationErrors.length > 0"
          class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg"
        >
          <h3 class="text-sm font-medium text-red-800 mb-2">
            Please fix the following errors:
          </h3>
          <ul class="text-sm text-red-700 space-y-1">
            <li v-for="error in validationErrors" :key="error">
              • {{ error }}
            </li>
          </ul>
        </div>

        <div class="space-y-6">
          <div>
            <label
              for="title"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Movie Title *
            </label>
            <input
              id="title"
              v-model="movieForm.title"
              type="text"
              :maxlength="VALIDATION.TITLE_MAX_LENGTH"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter movie title"
            />
            <p class="mt-1 text-xs text-gray-500">
              {{ movieForm.title.length }}/{{
                VALIDATION.TITLE_MAX_LENGTH
              }}
              characters
            </p>
          </div>

          <div>
            <label
              for="director"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Director *
            </label>
            <input
              id="director"
              v-model="movieForm.director"
              type="text"
              :maxlength="VALIDATION.DIRECTOR_MAX_LENGTH"
              required
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Enter director name"
            />
            <p class="mt-1 text-xs text-gray-500">
              {{ movieForm.director.length }}/{{
                VALIDATION.DIRECTOR_MAX_LENGTH
              }}
              characters
            </p>
          </div>

          <div>
            <label
              for="summary"
              class="block text-sm font-medium text-gray-700 mb-2"
            >
              Summary
            </label>
            <textarea
              id="summary"
              v-model="movieForm.summary"
              :maxlength="VALIDATION.SUMMARY_MAX_LENGTH"
              rows="4"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              placeholder="Enter movie summary (optional)"
            />
            <p class="mt-1 text-xs text-gray-500">
              {{ movieForm.summary.length }}/{{
                VALIDATION.SUMMARY_MAX_LENGTH
              }}
              characters
            </p>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-3">
              Genres * (Select at least one)
            </label>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <label
                v-for="genre in GENRE_OPTIONS"
                :key="genre"
                class="relative flex items-center p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                :class="{
                  'bg-blue-50 border-blue-300':
                    movieForm.genres.includes(genre),
                }"
              >
                <input
                  v-model="movieForm.genres"
                  type="checkbox"
                  :value="genre"
                  class="sr-only"
                />
                <div
                  class="w-4 h-4 rounded border-2 mr-3 flex items-center justify-center transition-all"
                  :class="
                    movieForm.genres.includes(genre)
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-gray-300'
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
                    />
                  </svg>
                </div>
                <span
                  class="text-sm font-medium transition-colors"
                  :class="
                    movieForm.genres.includes(genre)
                      ? 'text-blue-900'
                      : 'text-gray-700'
                  "
                >
                  {{ genre }}
                </span>
              </label>
            </div>
          </div>
        </div>

        <div class="flex justify-end pt-8 border-t border-gray-200 mt-8">
          <button
            type="submit"
            :disabled="!isFormValid || isLoading"
            class="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors min-w-[120px]"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              Saving...
            </span>
            <span v-else>
              {{ isEditMode ? 'Update Movie' : 'Create Movie' }}
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
