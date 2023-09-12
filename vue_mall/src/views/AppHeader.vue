<template>
	<header>
		<nav>
			<h1>
				<router-link to="/" :class="fontColor">FORCE SENSITIVE</router-link>
			</h1>
			<ul v-if="!loginUser.id">
				<router-link to="/member/login" :class="fontColor">LOGIN</router-link>
				<router-link to="/member/join" :class="fontColor">JOIN</router-link>
			</ul>
			<ul v-else>
				<a :class="fontColor">MYPAGE</a>
				<a :class="fontColor">LOGOUT</a>
			</ul>
		</nav>
	</header>
	<aside>
		<article>
			<p :class="fontColor" id="title">POWER FORCE SERVICE</p>
			<ul>
				<router-link to="/products" :class="fontColor">ALL</router-link>
				<a :class="fontColor">OUTER</a>
				<a :class="fontColor">TOP</a>
				<a :class="fontColor">BOTTOM</a>
				<a :class="fontColor">ACC</a>
			</ul>
		</article>
		<article>
			<a :class="fontColor">COMMUNITY</a>
		</article>
		<article>
			<a :class="fontColor">CALL INFO</a>
			<a :class="fontColor">BANK INFO</a>
		</article>
	</aside>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';
const route = useRoute();
const fontColor = ref('colorWhite');

const store = useUserInfoStore();
const { loginUser } = storeToRefs(store);

watch(
	() => route.fullPath,
	newPath => {
		updateFontColor(newPath);
	},
);

const updateFontColor = newPath => {
	fontColor.value = newPath === '/' ? 'colorWhite' : '';
};
</script>

<style scoped>
header {
	position: fixed;
	top: 3rem;
	left: 0;
	z-index: 0;
	color: #fff;
	width: 100%;
}
nav {
	display: flex;
	justify-content: space-between;
	padding: 0 3rem;
	background: none;
}
header a,
aside a {
	font-size: 1.3rem;
}
h1 a {
	font-size: 3rem;
	font-weight: bold;
}
nav ul > a {
	margin-left: 2rem;
}
aside {
	position: fixed;
	top: 12rem;
	left: 0;
	width: 20%;
	padding: 10rem 3rem;
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
</style>
