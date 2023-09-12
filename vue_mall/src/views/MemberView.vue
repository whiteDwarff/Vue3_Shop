<template>
	<div>
		<LoginForm v-if="$route.fullPath.includes('login')" />
		<JoinForm v-else-if="$route.fullPath.includes('join')" />
	</div>
</template>

<script setup>
import LoginForm from '@/components/member/LoginForm.vue';
import JoinForm from '@/components/member/JoinForm.vue';
</script>

<style lang="scss" scoped></style>
