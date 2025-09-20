import { createRouter, createWebHistory } from 'vue-router';
import { ROUTES } from '../constants';

const MovieList = () => import('../components/MovieList.vue');
const MovieForm = () => import('../components/MovieForm.vue');

const routes = [
  {
    path: ROUTES.HOME,
    name: 'Home',
    component: MovieList,
    meta: {
      title: 'Movie Collection',
    },
  },
  {
    path: ROUTES.MOVIE_CREATE,
    name: 'MovieCreate',
    component: MovieForm,
    meta: {
      title: 'Add New Movie',
    },
  },
  {
    path: `${ROUTES.MOVIE_EDIT}/:id`,
    name: 'MovieEdit',
    component: MovieForm,
    meta: {
      title: 'Edit Movie',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: ROUTES.HOME,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  document.title = to.meta.title || 'Movie Collection';
});

export default router;
