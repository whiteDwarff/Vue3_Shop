<template>
	{{ postMessage }}
	<select :value="postMessage" @change="selected" id="post-message">
		<option>-- 메시지 선택 (선택사항) --</option>
		<option value="배송 전에 미리 연락바랍니다.">
			배송 전에 미리 연락바랍니다.
		</option>
		<option value="부재 시 경비실에 맡겨주세요.">
			부재 시 경비실에 맡겨주세요.
		</option>
		<option value="부재 시 문 앞에 놓아주세요.">
			부재 시 문 앞에 놓아주세요.
		</option>
		<option value="빠른 배송 부탁드립니다.">빠른 배송 부탁드립니다.</option>
		<option value="택배함에 보관해 주세요.">택배함에 보관해 주세요.</option>
		<option>직접 입력</option>
	</select>
	<textarea v-if="postMessage === '직접 입력'" type="text" id="message-input" />
</template>

<script setup>
defineProps({
	postMessage: String,
});
const emit = defineEmits(['update:message']);

const selected = e => {
	emit('update:messge', e.target.value);
};
</script>

<style scoped>
#post-message {
	margin: 1rem 0 2rem 0;
	width: 100%;
	padding: 1%;
	outline: none;
}
#message-input {
	width: calc(100% - 2%);
	padding: 1%;
	resize: none;
	outline: none;
}
</style>
