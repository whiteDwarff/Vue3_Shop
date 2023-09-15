<template>
	<div class="flex-box align-center" id="tel-box">
		<label v-if="labelTitle" for="id-field">{{ labelTitle }}</label>
		<select @chage="$emit('update:number', e.target.value)">
			<option value="010">010</option>
			<option value="011">011</option>
			<option value="016">016</option>
			<option value="017">017</option>
			<option value="018">018</option>
			<option value="019">019</option>
		</select>
		<span class="hyphen">-</span>
		<input type="text" id="middle-number" minlength="3" maxlength="4" />
		<span class="hyphen">-</span>
		<input type="text" id="last-number" minlength="3" maxlength="4" />
	</div>
</template>

<script setup>
defineProps({
	labelTitle: String || '',
	number: Object || null,
});
defineEmits(['update:number']);
</script>

<style scoped>
#tel-box select,
input {
	width: 30%;
}
.hyphen {
	display: block;
	margin: 0 1rem;
}
.non-width {
	width: 0;
}
</style>
