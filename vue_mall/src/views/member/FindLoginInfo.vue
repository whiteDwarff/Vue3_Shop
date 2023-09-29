<template>
	<section class="wrap">
		<h3 class="form-title">아이디 찾기</h3>
		<article id="info-wrap" v-if="isInfoState && accountInfo">
			<span class="blue bold">고객님 아이디 찾기가 완료 되었습니다.</span>
			<div class="font">
				<label>ID</label>
				<span class="border-bottom">{{ accountInfo.id }}</span>
			</div>
			<div class="font">
				<label>NAME</label>
				<span>{{ accountInfo.name }}</span>
			</div>
			<div class="font">
				<label>EAMIL</label>
				<span>{{ accountInfo.email }}</span>
			</div>
			<p class="grey">
				고객님의 아이디 찾기가 성공적으로 이루어졌습니다. 항상 고객님의
				즐겁고<br />
				편리한 쇼핑을 위해 최선의 노력을 다하는 쇼핑몰이 되도록 하겠습니다
			</p>
			<div id="button-wrap" class="flex-box center">
				<router-link to="/login" class="router">로그인</router-link>
				<router-link to="/findPasswordInfo" class="router"
					>비밀번호 찾기</router-link
				>
			</div>
		</article>
		<form v-else @submit.prevent="submit">
			<div class="border-bottom">
				<label for="id-field">NAME</label>
				<input v-focus id="id-field" v-model.trim="info.name" />
			</div>
			<div class="border-bottom flex-box align-center">
				<label for="">TEL</label>
				<NumberForm
					v-model:firstNumber="info.firstTel"
					v-model:middleNumber="info.middleTel"
					v-model:lastNumber="info.lastTel"
				/>
			</div>
			<button id="submit-button" class="pointer">SUBMIT</button>
		</form>
	</section>
</template>

<script setup>
import NumberForm from '@/components/member/NumberForm.vue';
import { computed, ref } from 'vue';
import { useUserInfoStore } from '@/store/user.js';
import { storeToRefs } from 'pinia';

const store = useUserInfoStore();

const info = ref({
	name: '',
	firstTel: '010',
	middleTel: null,
	lastTel: null,
});
const isInfoState = ref(false);
const { accountInfo } = storeToRefs(store);

const infoTotalTel = computed(() => {
	return `${info.value.firstTel}-${info.value.middleTel}-${info.value.lastTel}`;
});

const submit = () => {
	if (!info.value.middleTel || !info.value.lastTel || !info.value.name)
		alert('빈칸을 모두 입력해주세요');
	else if (
		store.accountInfo.name === info.value.name &&
		infoTotalTel.value === store.totalTel
	) {
		isInfoState.value = true;
	} else alert('등록된 회원이 아닙니다.');
};
</script>

<style scoped>
#info-wrap {
	width: 100%;
	border: 1px solid #888888;
	padding: 3rem;
}
#info-wrap .font {
	margin-bottom: 1rem;
}
.blue {
	font-size: 1.6rem;
	display: block;
	text-align: center;
	margin-bottom: 2rem;
}

#id-field {
	outline: none;
	border: none;
	padding: 1rem;
}
#submit-button {
	border: none;
	outline: none;
	background-color: #fff;
	display: block;
	margin-left: auto;
}
p {
	text-align: center;
	margin: 3rem 0;
}
#button-wrap {
	text-align: center;
}
.router {
	padding: 1rem 0;
	display: block;
	background-color: #000;
	width: 20%;
	color: #fff;
}
.router:first-child {
	margin-right: 1rem;
}
</style>
