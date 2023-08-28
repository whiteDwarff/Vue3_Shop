<template>
	<div id="main-image-view">
		<div class="toggle-image">
			<img :src="image[isToggleState]" alt="디테일 이미지" />
		</div>
		<div class="flex-box center">
			<img
				v-for="(item, i) in image"
				:key="i"
				:src="item"
				@click="toggleHandler"
			/>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
	image: {
		type: Array,
		reqired: true,
	},
});
const isToggleState = ref(0);
const toggleHandler = () => {
	if (isToggleState.value) isToggleState.value = 0;
	else isToggleState.value = 1;
};
</script>

<style scoped>
#main-image-view > div {
	text-align: center;
}
.toggle-image img {
	width: 50%;
}
.flex-box img {
	width: 25%;
	cursor: pointer;
}
</style>
