<template>
	<article>
		<div>
			<span>입금은행</span>
			<input :value="ownerBank" type="text" />
		</div>
		<div>
			<span>입금자명</span>
			<input :value="accountInfo.name" type="text" />
		</div>
		<div id="cashReceipt">
			<div>
				<label for="">현금영수증 신청</label>
				<input
					@change="updateCashReceipt"
					value="현금영수증 신청"
					name="cashReceipt"
					type="radio"
					id=""
				/>
				<label for="">신청안함</label>
				<input
					@change="updateCashReceipt"
					value="신청안함"
					name="cashReceipt"
					type="radio"
					checked
					id=""
				/>
			</div>

			<div v-if="cashReceipt === '현금영수증 신청'">
				<div>
					<label for="">개인</label>
					<input
						@change="updateCashReceiptInfo"
						value="individual"
						type="radio"
						name="cashReceiptInfo"
						checked
					/>
					<label for="">사업자</label>
					<input
						@change="updateCashReceiptInfo"
						value="businesses"
						type="radio"
						name="cashReceiptInfo"
					/>
				</div>
			</div>

			<NumberForm
				v-model="number"
				v-if="
					cashReceiptInfo === 'individual' && cashReceipt == '현금영수증 신청'
				"
			/>
		</div>
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

defineProps({
	ownerBank: String,
	cashReceipt: String,
	cashReceiptInfo: String,
});
// -----------------------------------------------------------

const emit = defineEmits(['update:cashReceipt', 'update:cashReceiptInfo']);
const updateCashReceipt = e => {
	emit('update:cashReceipt', e.target.value);
};
const updateCashReceiptInfo = e => {
	emit('update:cashReceiptInfo', e.target.value);
};
// -----------------------------------------------------------
const number = ref({
	firstTel: '010',
	middleTel: null,
	lastTel: null,
});
</script>

<style lang="scss" scoped></style>
