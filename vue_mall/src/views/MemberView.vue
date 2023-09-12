<template>
	<div>
		<LoginForm
			v-if="$route.fullPath.includes('login')"
			@submit.prevent="login"
			v-model:id.trim="memberInfo.id"
			v-model:password.trim="memberInfo.password"
			v-model:saveInfo="memberInfo.isSaveLoginInfo"
		/>
		<JoinForm v-else-if="$route.fullPath.includes('join')" />
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

// join submit event
// ------------------------------------------------------------
</script>

<style lang="scss" scoped></style>
