import { createWebHistory, createRouter } from 'vue-router';
import Acceptance from '@/views/Acceptance.vue';
import References from '@/views/References.vue';

const routes = [
  {
    path: '/',
    name: 'Acceptance',
    component: Acceptance,
  },
  {
    path: '/references',
    name: 'References',
    component: References,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
