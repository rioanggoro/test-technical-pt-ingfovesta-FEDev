import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ROUTES } from '../constants';
import { useMovieStore } from '../stores/movieStore';
import { useMovieValidation } from './useMovieValidation';

export function useMovieForm() {
  const router = useRouter();
  const route = useRoute();
  const movieStore = useMovieStore();

  const movieForm = ref({
    id: null,
    title: '',
    director: '',
    summary: '',
    genres: [],
  });

  const { isFormValid, validationErrors } = useMovieValidation(movieForm);

  const isEditMode = computed(() => Boolean(route.params.id));
  const isLoading = ref(false);

  const initializeForm = () => {
    if (isEditMode.value) {
      const existingMovie = movieStore.getMovieById(route.params.id);
      if (existingMovie) {
        movieForm.value = { ...existingMovie };
      } else {
        router.push(ROUTES.HOME);
      }
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid.value) return;

    isLoading.value = true;

    try {
      if (isEditMode.value) {
        const success = movieStore.updateMovie(movieForm.value);
        if (!success) {
          throw new Error('Failed to update movie');
        }
      } else {
        movieStore.addMovie(movieForm.value);
      }

      router.push(ROUTES.HOME);
    } catch (error) {
      console.error('Error saving movie:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this movie?')) return;

    isLoading.value = true;

    try {
      const success = movieStore.deleteMovie(movieForm.value.id);
      if (!success) {
        throw new Error('Failed to delete movie');
      }

      router.push(ROUTES.HOME);
    } catch (error) {
      console.error('Error deleting movie:', error);
    } finally {
      isLoading.value = false;
    }
  };

  const navigateBack = () => {
    router.push(ROUTES.HOME);
  };

  return {
    movieForm,
    isEditMode,
    isLoading,
    isFormValid,
    validationErrors,
    initializeForm,
    handleSubmit,
    handleDelete,
    navigateBack,
  };
}
