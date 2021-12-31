import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
import BigBangTheory from '@/views/BigBangTheory.vue';

const routes = [
	/* {
    path: '/',
    redirect: '/groups',
    meta: { requiresAuth: true }
  }, */
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/big-bang-theory',
		name: 'BigBangTheory',
		component: BigBangTheory,
	},
	// {
	//   path: '/technology',
	//   name: 'Technology',
	//   component: Technology,
	// },
	// {
	//   path: '/destination',
	//   name: 'Destination',
	//   component: Destination,
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
