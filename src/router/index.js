import { createRouter, createWebHistory } from 'vue-router';
import MovieForm from '../components/MovieForm.vue';
import MovieList from '../components/MovieList.vue';

const routes = [
  {
    path: '/',
    name: 'MovieList',
    component: MovieList,
  },
  {
    path: '/movies/new',
    name: 'MovieCreate',
    component: MovieForm,
  },
  {
    path: '/movies/edit/:id',
    name: 'MovieEdit',
    component: MovieForm,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
