<template>
	<div class="border-bottom" id="post-form">
		<label>POST</label>
		<input
			v-focus
			@input="$emit('update:postCode', $event.target.value)"
			:value="postCode"
			type="text"
			id="postCode"
			class="outline-none"
			placeholder="Post Code"
			disabled
		/>
		<input
			type="button"
			@click="$emit('onPosted')"
			value="우편번호 찾기"
			id="posted-button"
		/><br />
		<input
			@input="$emit('update:adress', $event.target.value)"
			:value="adress"
			type="text"
			id="adress"
			class="outline-none"
			placeholder="Adress"
			disabled
		/><br />
		<input
			@input="$emit('update:detailAdress', $event.target.value)"
			:value="detailAdress"
			type="text"
			id="detailAdress"
			class="outline-none"
			placeholder="Detail Adress"
		/>
		<input
			@input="$emit('update:extraAdress', $event.target.value)"
			:value="extraAdress"
			type="text"
			id="extraAdress"
			disabled
		/>
	</div>
</template>

<script setup>
// import { ref } from 'vue';

defineProps({
	// post: Object,
	postCode: String,
	adress: String,
	detailAdress: String,
	extraAdress: String,
});
defineEmits([
	'update:postCode',
	'update:adress',
	'update:detailAdress',
	'update:extraAdress',
	'onPosted',
]);
</script>

<style scoped>
#post-form * {
	margin-bottom: 1rem;
}
label:first-child {
	display: block;
}
input {
	background-color: #fff;
}
input::placeholder {
	font-size: 0.8rem;
}
#posted-button {
	border: none;
	background-color: #000;
	color: #fff;
	cursor: pointer;
	width: 30%;
	border-radius: 0.5rem;
}
#extraAdress {
	width: 30%;
	border: none;
}
</style>
