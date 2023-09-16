<template>
	<div class="guide-title flex-box space-between align-center">
		<h3 class="bold guide-h3">{{ title }}</h3>
		<i
			@click="changeOptionHandler"
			:class="{ rotate: option == false }"
			class="fa-solid fa-angle-down pointer"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	title: String,
	option: Boolean,
});
const emit = defineEmits(['update:option']);
const changeOptionHandler = () => {
	emit('update:option', !props.option);
};
</script>

<style scoped>
.guide-title {
	background-color: #fff;
	padding: 2rem 0;
	border-top: 1px solid #ccc;
}
i {
	font-size: 1.5rem;
	transition: 0.5s ease-in-out;
	color: #3971ff;
}
.rotate {
	transform: rotate(180deg);
	transition: 0.5s ease-in-out;
	color: red;
}
</style>
