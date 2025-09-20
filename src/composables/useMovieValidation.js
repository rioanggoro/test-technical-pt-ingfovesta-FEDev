import { computed } from 'vue';
import { VALIDATION } from '../constants';

export function useMovieValidation(movieForm) {
  const isValidTitle = computed(() => {
    return (
      movieForm.value.title &&
      movieForm.value.title.trim().length > 0 &&
      movieForm.value.title.length <= VALIDATION.TITLE_MAX_LENGTH
    );
  });

  const isValidDirector = computed(() => {
    return (
      movieForm.value.director &&
      movieForm.value.director.trim().length > 0 &&
      movieForm.value.director.length <= VALIDATION.DIRECTOR_MAX_LENGTH
    );
  });

  const isValidSummary = computed(() => {
    return movieForm.value.summary.length <= VALIDATION.SUMMARY_MAX_LENGTH;
  });

  const isValidGenres = computed(() => {
    return (
      Array.isArray(movieForm.value.genres) && movieForm.value.genres.length > 0
    );
  });

  const isFormValid = computed(() => {
    return (
      isValidTitle.value &&
      isValidDirector.value &&
      isValidSummary.value &&
      isValidGenres.value
    );
  });

  const validationErrors = computed(() => {
    const errors = [];

    if (!isValidTitle.value) {
      errors.push('Title is required and must be less than 100 characters');
    }

    if (!isValidDirector.value) {
      errors.push('Director is required and must be less than 100 characters');
    }

    if (!isValidSummary.value) {
      errors.push(
        `Summary must be less than ${VALIDATION.SUMMARY_MAX_LENGTH} characters`
      );
    }

    if (!isValidGenres.value) {
      errors.push('At least one genre must be selected');
    }

    return errors;
  });

  return {
    isValidTitle,
    isValidDirector,
    isValidSummary,
    isValidGenres,
    isFormValid,
    validationErrors,
  };
}
