import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/MainView.vue'),
	},
	{
		path: '/member',
		name: 'member',
		component: () => import('@/views/MemberView.vue'),
		children: [
			{
				path: '',
				name: 'default',
				component: () => import('@/components/member/LoginForm.vue'),
			},
			{
				path: 'login',
				name: 'login',
				component: () => import('@/components/member/LoginForm.vue'),
			},
			{
				path: 'join',
				name: 'join',
				component: () => import('@/components/member/JoinForm.vue'),
			},
		],
	},
	{
		path: '/products',
		name: 'products',
		component: () => import('@/views/product/ProductsList.vue'),
	},
	{
		path: '/productDetail/:id',
		name: 'productDetail',
		component: () => import('@/views/product/ProductDetail.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(''),
	routes,
});

export default router;
