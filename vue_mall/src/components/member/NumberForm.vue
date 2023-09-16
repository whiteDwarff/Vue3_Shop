<template>
	<div class="flex-box align-center" id="tel-box">
		<label v-if="labelTitle" for="id-field">{{ labelTitle }}</label>
		<select @change="updateSelectNumber">
			<option value="010">010</option>
			<option value="011">011</option>
			<option value="016">016</option>
			<option value="017">017</option>
			<option value="018">018</option>
			<option value="019">019</option>
		</select>
		<span class="hyphen">-</span>
		<input
			@input="updateMiddleTel"
			type="text"
			id="middle-number"
			minlength="3"
			maxlength="4"
		/>
		<span class="hyphen">-</span>
		<input
			@input="updateLastTel"
			type="text"
			id="last-number"
			minlength="3"
			maxlength="4"
		/>
	</div>
</template>

<script setup>
defineProps({
	labelTitle: String || undefined,
	firstNumber: String,
	middleNumber: String,
	lastNumber: String,
});
const emit = defineEmits([
	'update:firstNumber',
	'update:middleNumber',
	'update:lastNumber',
]);

const updateSelectNumber = e => {
	emit('update:firstNumber', e.target.value);
};
const updateMiddleTel = e => {
	emit('update:middleNumber', e.target.value);
};
const updateLastTel = e => {
	emit('update:lastNumber', e.target.value);
};
</script>

<style scoped>
#tel-box select,
input {
	width: 30%;
}
.hyphen {
	display: block;
	margin: 0 2.5%;
}
.non-width {
	width: 0;
}
select,
input {
	outline: none;
	padding: 1rem 0;
	border: 1px solid #bbb;
}
</style>
