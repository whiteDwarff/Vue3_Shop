<template>
	<div>
		<LoginForm
			v-if="$route.fullPath.includes('login')"
			@submit.prevent="login"
			v-model:id.trim="memberInfo.id"
			v-model:password.trim="memberInfo.password"
			v-model:saveInfo="memberInfo.isSaveLoginInfo"
		/>
		<JoinForm
			v-if="$route.fullPath.includes('join')"
			@submit.prevent="join"
			v-model:id.trim="nonMemberInfo.id"
			v-model:pwd.trim="nonMemberInfo.password"
			v-model:pwdCheck.trim="nonMemberInfo.passwordCheck"
			v-model:name.trim="nonMemberInfo.name"
			v-model:firstNumber="nonMemberInfo.firstNumber"
			v-model:middleNumber="nonMemberInfo.middleNumber"
			v-model:lastNumber="nonMemberInfo.lastNumber"
			v-model:email.trim="nonMemberInfo.email"
		/>
	</div>
</template>

<script setup>
import LoginForm from '@/components/member/LoginForm.vue';
import JoinForm from '@/components/member/JoinForm.vue';
import { ref } from 'vue';

// ------------------------------------------------------------
// login info
const memberInfo = ref({
	id: null,
	password: null,
	isSaveLoginInfo: false,
});
// login submit event
const login = () => alert('Success Login!!');

// ------------------------------------------------------------
// nonMemberInfo
const nonMemberInfo = ref({
	id: null,
	password: null,
	passwordCheck: null,
	name: null,
	firstNumber: '010',
	middleNumber: null,
	lastNumber: null,
	email: null,
});
// join submit event
const join = () => alert('Success Join!!');
// ------------------------------------------------------------
</script>

<style lang="scss" scoped></style>
