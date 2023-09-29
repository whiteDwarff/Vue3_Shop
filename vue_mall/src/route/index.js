import { createRouter, createWebHistory } from 'vue-router';

const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('@/views/MainView.vue'),
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/member/LoginForm.vue'),
	},
	{
		path: '/join/:title',
		name: 'join',
		component: () => import('@/views/member/JoinForm.vue'),
		props: true,
	},
	{
		path: '/findInfo',
		name: 'findInfo',
		component: () => import('@/views/member/FindLoginInfo.vue'),
	},
	{
		path: '/findPasswordInfo',
		name: 'findPasswordInfo',
		component: () => import('@/views/member/FindPasswordInfo.vue'),
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
	{
		path: '/payment',
		name: 'payment',
		component: () => import('@/views/PaymentView.vue'),
	},
	{
		path: '/orderHistory/:id',
		name: 'orderHistory',
		component: () => import('@/views/order/OrderHistory.vue'),
	},
	{
		path: '/orderList',
		name: 'orderList',
		component: () => import('@/views/order/OrderList.vue'),
	},
	{
		path: '/wishList',
		name: 'wishList',
		component: () => import('@/views/product/WishList.vue'),
	},
	{
		path: '/myshop',
		name: 'myshop',
		component: () => import('@/views/member/MyShop.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(''),
	routes,
	scrollBehavior() {
		// 항상 맨 위로 스크롤
		return { top: 0 };
	},
});

export default router;
