<template>
	<article id="orderer">
		<h3>{{ orderer }}</h3>
		<div class="border-bottom">
			<label for="name">NAME</label>
			<input
				@input="$emit('update:name', $event.target.value)"
				type="text"
				id="name"
				class="outline-none"
			/>
			<!-- validation -->
			<span></span>
		</div>
		<div class="border-bottom">
			<label>TEL</label>
			<input
				@input="$emit('update:tel', $event.target.value)"
				type="text"
				class="outline-none"
			/>
			<!-- validation -->
			<span></span>
		</div>
		<slot name="footer"></slot>
	</article>
</template>

<script setup>
defineProps({
	orderer: String,
	name: String,
	tel: String,
});
defineEmits(['update:name', 'update:tel']);
</script>

<style scoped>
label {
	font-size: 1.2rem;
	display: inline-block;
	width: 15%;
}
.border-bottom input {
	font-size: 14px;
	width: 40%;
}
</style>
