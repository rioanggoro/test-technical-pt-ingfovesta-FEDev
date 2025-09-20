export const STORAGE_KEYS = {
  MOVIES: 'movies_collection',
};

export const GENRE_OPTIONS = [
  'Action',
  'Animation',
  'Comedy',
  'Drama',
  'Horror',
  'Romance',
  'Sci-Fi',
  'Thriller',
];

export const GENRE_COLORS = {
  Action: 'bg-red-100 text-red-700',
  Animation: 'bg-pink-100 text-pink-700',
  Comedy: 'bg-yellow-100 text-yellow-700',
  Drama: 'bg-green-100 text-green-700',
  Horror: 'bg-gray-800 text-white',
  Romance: 'bg-rose-100 text-rose-700',
  'Sci-Fi': 'bg-blue-100 text-blue-700',
  Thriller: 'bg-gray-100 text-gray-700',
};

export const ROUTES = {
  HOME: '/',
  MOVIE_CREATE: '/movies/new',
  MOVIE_EDIT: '/movies/edit',
};

export const VALIDATION = {
  TITLE_MAX_LENGTH: 100,
  DIRECTOR_MAX_LENGTH: 100,
  SUMMARY_MAX_LENGTH: 500,
};
