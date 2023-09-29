<template>
	<header>
		<nav class="flex-box center">
			<h1>
				<router-link to="/" :class="updateHeaderColor"
					>FORCE SENSITIVE</router-link
				>
			</h1>
			<ul>
				<!-- 로그인 상태가 아닌 경우 -->
				<template v-if="!loginUser.id">
					<router-link to="/login" :class="updateHeaderColor"
						>LOGIN</router-link
					>
					<router-link
						:to="{ name: 'join', params: { title: 'CREATE ACCOUNT' } }"
						:class="updateHeaderColor"
						>JOIN</router-link
					>
				</template>
				<!-- 로그인 상태 -->
				<template v-else>
					<router-link to="/myshop" :class="updateHeaderColor"
						>MY SHOP</router-link
					>
					<a @click="logout" :class="updateHeaderColor" class="pointer"
						>LOG OUT</a
					>
				</template>
				<router-link to="/wishList" :class="updateHeaderColor"
					>WISH
					<span v-if="wishList.length" id="wish-count">{{
						wishList.length
					}}</span></router-link
				>
			</ul>
		</nav>
	</header>
	<!-- aside -->
	<aside>
		<!-- category -->
		<article>
			<p :class="updateColor" id="title">POWER FORCE SERVICE</p>
			<ul>
				<router-link to="/products" :class="updateColor">ALL</router-link>
			</ul>
		</article>
		<!-- info -->
		<article>
			<a
				@click="isDisplayOption.call = !isDisplayOption.call"
				:class="updateColor"
				class="pointer"
				>CALL INFO</a
			>
			<div class="info-guide" v-if="isDisplayOption.call">
				<span class="bold font grey">010-8637-1685</span>
				<span class="grey">WEEKLY 13:00 ~ 18:00</span>
				<span class="grey">WEEKEND/HOLIDAY OFF</span>
			</div>
			<a
				@click="isDisplayOption.bank = !isDisplayOption.bank"
				:class="updateColor"
				class="pointer"
				>BANK INFO</a
			>
			<div class="info-guide" v-if="isDisplayOption.bank">
				<span class="bold font grey">하나 287-910365-17807</span>
				<span class="grey">예금주 : 강문호</span>
			</div>
		</article>
	</aside>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserInfoStore } from '@/store/user';
import { useWishStore } from '@/store/wish';
import { storeToRefs } from 'pinia';

const userStore = useUserInfoStore();
const { loginUser } = storeToRefs(userStore);
const wishStore = useWishStore();
const { wishList } = storeToRefs(wishStore);

const router = useRouter();
const route = useRoute();

const isDisplayOption = ref({
	call: false,
	bank: false,
});

const logout = () => {
	if (confirm('로그아웃 하시겠습니까?')) {
		localStorage.removeItem('login');
		loginUser.value = {};
		router.push({ name: 'login' });
	}
};

const updateColor = computed(() => {
	return route.fullPath == '/' ? 'colorWhite' : 'color-ccc';
});
const updateHeaderColor = computed(() => {
	return route.fullPath == '/' ? 'colorWhite' : 'colorBlack';
});
</script>

<style scoped>
header {
	position: fixed;
	top: 3rem;
	left: 0;
	z-index: 0;
	color: #fff;
	width: 100%;
	background: none;
}
nav {
	display: flex;
	justify-content: space-between;
	padding: 0 3rem;
	background: none;
}
nav a {
	font-size: 1.3rem;
}
aside a {
	font-size: 1.3rem;
	font-weight: bold;
	transition: 0.5s ease-in;
	cursor: pointer;
}
h1 a {
	font-size: 3rem;
	font-weight: bold;
}
nav ul > a {
	margin-left: 2rem;
}
#wish-count {
	width: 1.5rem;
	height: 1.5rem;
	line-height: 1.5rem;
	text-align: center;
	border-radius: 7px;
	display: inline-block;
	background-color: #000;
	color: #fff;
}
aside {
	position: fixed;
	top: 12rem;
	left: 0;
	width: 15%;
	padding: 10rem 3rem;
	background: none;
}
#title {
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 2rem;
}
aside article {
	margin-bottom: 7rem;
}
aside article a {
	display: block;
	margin-bottom: 0.5rem;
}
.colorWhite {
	color: #909090;
	transition: 0.2s ease-out;
}
.colorWhite:hover {
	color: #fff;
	transition: 0.7s ease-out;
}
.color-ccc {
	color: #ccc;
	transition: 0.2s ease-out;
}
.color-ccc:hover {
	color: rgb(88, 88, 88);
	transition: 0.7s ease-out;
}
.colorBlack {
	color: rgb(88, 88, 88);
	transition: 0.7s ease-out;
}
span {
	display: block;
	margin-bottom: 0.5rem;
}
.info-guide {
	margin: 1rem 0 3rem 0;
}
</style>
