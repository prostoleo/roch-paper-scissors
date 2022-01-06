import { createRouter, createWebHistory } from 'vue-router';

import Home from '@/views/Home.vue';
const BigBangTheory = () => import('../views/BigBangTheory.vue');

const routes = [
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
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
