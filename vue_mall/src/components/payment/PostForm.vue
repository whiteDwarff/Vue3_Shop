<template>
	<div class="border-bottom">
		<h3>POST</h3>
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
		/><br />
		<input
			:value="adress"
			type="text"
			id="adress"
			class="outline-none"
			placeholder="Adress"
			disabled
		/><br />
		<input
			@input="$emit('update:detailAdress', $event.target.value)"
			type="text"
			id="detailAdress"
			class="outline-none"
			placeholder="Detail Adress"
		/>
		<input :value="extraAdress" type="text" id="extraAdress" disabled />
		<div>
			<select v-model="postReq">
				<option>배송전에 미리 연락바랍니다.</option>
				<option>부재 시 경비실에 맡겨주세요.</option>
				<option>부재 시 문 앞에 놓아주세요.</option>
				<option>뻐른 배송 부탁드립니다.</option>
				<option>택배함에 보관해주세요.</option>
				<option>직접 입력</option>
			</select>
			<input v-if="postReq === '직접 입력'" id="post-req" />
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({
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
const postReq = ref('배송전에 미리 연락바랍니다.');
</script>

<style lang="scss" scoped></style>
