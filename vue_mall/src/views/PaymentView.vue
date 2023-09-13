<template>
	<section class="form-wrap">
		<h3>배송지</h3>
		<article id="user-info">
			<p class="bold">
				<span class="color-blue">[기본]</span> {{ accountInfo.name }}
			</p>
			<p>{{ totalAdress }}</p>
			<p class="border-box">{{ totalTel }}</p>

			<PostMessage v-model:postMessage="postMessage" />
		</article>

		<!-- <ProductLabel /> -->
	</section>
</template>

<script setup>
import PostMessage from '@/components/payment/PostMessage.vue';
import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// -----------------------------------------------------------
const userStore = useUserInfoStore();
const { accountInfo } = storeToRefs(userStore);
const totalAdress = userStore.totalAdress;
const totalTel = userStore.totalTel;
// -----------------------------------------------------------
const postMessage = ref('-- 메시지 선택 (선택사항) --');
</script>

<style scoped>
#user-info * {
	font-size: 1.5rem;
	margin-bottom: 2rem;
}
.color-blue {
	color: blue;
}
.border-box {
	border-bottom: 1px solid #ccc;
	color: #636363;
	padding-bottom: 3rem;
}
</style>
