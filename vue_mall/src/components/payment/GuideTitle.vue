<template>
	<div class="guide-title flex-box space-between align-center">
		<h3 class="bold guide-h3">{{ title }}</h3>
		<i class="fa-solid fa-angle-down pointer" />
	</div>
</template>

<script setup>
defineProps({
	title: String,
});
</script>

<style scoped>
.guide-title {
	background-color: #fff;
	padding: 2rem 0;
	border-bottom: 1px solid #ccc;
}
i {
	font-size: 1.5rem;
	transition: 0.5s ease-in-out;
}
i:hover {
	transform: rotate(180deg);
	transition: 0.5s ease-in-out;
}
</style>
