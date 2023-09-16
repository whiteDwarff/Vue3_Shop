<template>
	<article id="payInfo">
		<div class="bank-info flex-box align-center">
			<label class="font">입금은행</label>
			<input :value="ownerBank" type="text" disabled />
		</div>
		<div class="bank-info flex-box align-center">
			<label class="font">입금자명</label>
			<input :value="accountInfo.name" type="text" />
		</div>

		<!-- 현금영수증 신청여부 -->
		<div id="cashReceipt">
			<h4 class="font bold">현금영수증</h4>
			<label for="receipt-true" class="font">현금영수증 신청</label>
			<input
				@change="updateCashReceipt"
				value="true"
				name="cashReceipt"
				type="radio"
				id="receipt-true"
			/>
			<label for="receipt-false" class="font">신청안함</label>
			<input
				@change="updateCashReceipt"
				value="false"
				name="cashReceipt"
				type="radio"
				checked
				id="receipt-false"
			/>
		</div>

		<!-- 개인 및 사업자 번호 입력란 -->
		<div v-if="cashReceipt === 'true'" id="cashReceiptInfo">
			<label for="individual" class="font">개인</label>
			<input
				@change="updateCashReceiptInfo"
				value="individual"
				id="individual"
				type="radio"
				name="cashReceiptInfo"
				checked
			/>
			<label for="businesses" class="font">사업자</label>
			<input
				@change="updateCashReceiptInfo"
				id="businesses"
				value="businesses"
				type="radio"
				name="cashReceiptInfo"
			/>
		</div>

		<!-- 휴대폰번호 입력란 -->
		<NumberForm
			v-model:firstNumber="propFirstNumber"
			v-model:middleNumber="propMiddleNumber"
			v-model:lastNumber="propLastNumber"
			@update:firstNumber="updateFirstNumber"
			@update:middleNumber="updateMiddleNumber"
			@update:lastNumber="updateLastNumber"
			v-if="cashReceiptInfo === 'individual' && cashReceipt == 'true'"
		/>
		<!-- 사업자번호 입력란 -->
		<input
			v-if="cashReceiptInfo === 'businesses' && cashReceipt == 'true'"
			@input="updateBusinessesNumber"
			id="businesses-form"
			type="text"
		/>
	</article>
</template>

<script setup>
import NumberForm from '@/components/member/NumberForm.vue';

import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
// -----------------------------------------------------------
const store = useUserInfoStore();
const { accountInfo } = storeToRefs(store);
// -----------------------------------------------------------

const props = defineProps({
	ownerBank: String,
	cashReceipt: String,
	cashReceiptInfo: String,
	firstNumber: String,
	middleNumber: String,
	lastNumber: String,
	businessesNumber: String,
});
// -----------------------------------------------------------
const emit = defineEmits([
	'update:cashReceipt',
	'update:cashReceiptInfo',
	'update:firstNumber',
	'update:middleNumber',
	'update:lastNumber',
	'update:businessesNumber',
]);
// -----------------------------------------------------------
const updateCashReceipt = e => {
	emit('update:cashReceipt', e.target.value);
};
const updateCashReceiptInfo = e => {
	emit('update:cashReceiptInfo', e.target.value);
};
const updateBusinessesNumber = e => {
	emit('update:businessesNumber', e.target.value);
};
// -----------------------------------------------------------
const propFirstNumber = ref(props.firstNumber);
const propMiddleNumber = ref(props.middleNumber);
const propLastNumber = ref(props.lastNumber);

const updateFirstNumber = () => {
	emit('update:firstNumber', propFirstNumber.value);
};
const updateMiddleNumber = () => {
	emit('update:middleNumber', propMiddleNumber.value);
};
const updateLastNumber = () => {
	emit('update:lastNumber', propLastNumber.value);
};
// -----------------------------------------------------------
</script>

<style scoped>
.bank-info {
	margin-bottom: 2rem;
}
.bank-info label {
	width: 10%;
}
.bank-info input {
	width: 90%;
	outline: none;
	border: 1px solid #bbb;
	padding: 1% 0 1% 2%;
}
#cashReceipt {
	border-top: 1px solid #bbb;
	padding-top: 2rem;
	margin-bottom: 1rem;
}
#cashReceipt label,
#cashReceiptInfo label {
	display: inline;
}
#cashReceiptInfo,
.font {
	padding-bottom: 2rem;
}

input[type='radio'] {
	margin: 0 2rem 0 1rem;
}
#businesses-form {
	width: 100%;
	outline: none;
	padding: 1rem 0;
	border: 1px solid #bbb;
}
</style>
