<template>
	<section class="wrap">
		<h3 class="bold" id="title">주문상세조회</h3>

		<h4 class="bold font">주문정보</h4>
		<article>
			<div class="table-box">
				<div class="flex-box">
					<span class="label font">주문일자</span>
					<span class="content font">{{ orderInfo.orderInfo.date }}</span>
				</div>
				<div class="flex-box">
					<span class="label font">주문자</span>
					<span class="content font">{{ orderInfo.orderInfo.userName }}</span>
				</div>
				<div class="flex-box">
					<span class="label font">주문처리상태</span>
					<span class="content font">{{ orderInfo.orderInfo.state }}</span>
				</div>
			</div>
		</article>

		<h4 class="bold font">결제정보</h4>
		<article>
			<div class="table-box">
				<div class="flex-box">
					<span class="label font bold">총 주문금액</span>
					<span class="content font bold"
						>{{ orderInfo.paymentInfo.totalPrice.toLocaleString() }}원</span
					>
				</div>
				<div class="flex-box">
					<span class="label font">적립금</span>
					<span class="content font"
						>{{ orderInfo.paymentInfo.usePoint.toLocaleString() }}원</span
					>
				</div>
				<div class="flex-box" id="bd-top">
					<span class="label font bold">총 결제금액</span>
					<span class="content font bold blue"
						>{{ orderInfo.paymentInfo.finalPrice.toLocaleString() }}원</span
					>
				</div>
				<div class="flex-box" id="bd-bottom">
					<span class="label font bold">결제수단</span>
					<div class="content">
						<p class="bold font">무통장입금</p>
						<p class="font">입금자 : {{ orderInfo.paymentInfo.depositName }}</p>
						<p class="font">계좌번호 : {{ orderInfo.paymentInfo.bankInfo }}</p>
					</div>
				</div>
			</div>
		</article>

		<h4 class="bold font">현금영수증</h4>
		<article>
			<div class="table-box">
				<template v-if="orderInfo.receiptInfo.cashReceipt === 'true'">
					<div class="flex-box">
						<span class="label font">현금영수증</span>
						<span
							v-if="orderInfo.receiptInfo.cashReceiptInfo === 'businesses'"
							class="content font"
							>사업자</span
						>
						<span v-else class="content font">개인</span>
					</div>
					<div class="flex-box">
						<span class="label font">발급번호</span>
						<span class="content font">{{ finalNumber }}</span>
					</div>
				</template>
				<template v-else>
					<div class="flex-box">
						<span class="label font">현금영수증</span>
						<span class="content font">미신청</span>
					</div>
				</template>
			</div>
		</article>

		<h4 class="bold font">배송지정보</h4>
		<article>
			<div class="table-box">
				<div class="flex-box">
					<span class="label font">받으시는분</span>
					<span class="content font">{{ orderInfo.postInfo.userName }}</span>
				</div>
				<div class="flex-box">
					<span class="label font">주소</span>
					<span class="content font">{{ orderInfo.postInfo.adress }}</span>
				</div>
				<div class="flex-box">
					<span class="label font">휴대전화</span>
					<span class="content font">{{ orderInfo.postInfo.tel }}</span>
				</div>
				<div class="flex-box">
					<span class="label font">배송메시지</span>
					<span
						class="content font"
						v-if="
							orderInfo.postInfo.postMessage === '-- 메시지 선택 (선택사항) --'
						"
						>없음</span
					>
					<span v-else class="content font">{{
						orderInfo.postInfo.postMessage
					}}</span>
				</div>
			</div>
		</article>
	</section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useOrderListStore } from '@/store/order';
import { useRoute } from 'vue-router';
import { computed, ref } from 'vue';

const route = useRoute();
const id = parseInt(route.params.id);
// -----------------------------------------------------------
const store = useOrderListStore();
const fetchedOrderInfo = store.fetchedOrderInfo;
fetchedOrderInfo(id);
const { orderInfo } = storeToRefs(store);
// -----------------------------------------------------------
const receiptNumber = ref('');
const totalNumber = () => {
	let number = orderInfo.value.receiptInfo.receiptNumber;
	receiptNumber.value = `${number.firstNumber}-${number.middleNumber}-${number.lastNumber}`;
};
totalNumber();

const finalNumber = computed(() => {
	return typeof orderInfo.value.receiptInfo.receiptNumber === 'object'
		? receiptNumber.value
		: orderInfo.value.receiptInfo.receiptNumber;
});
</script>

<style scoped>
#title {
	font-size: 1.7rem;
}
h4 {
	margin-top: 3rem;
}
article {
	padding: 2rem 0;
}
.table-box {
	/* padding: 3rem 0; */
	border-top: 1px solid #bbb;
}
.label {
	width: 20%;
	border-right: 1px solid #bbb;
	padding: 1.5rem 1rem;
}
.content {
	width: 80%;
	padding: 1.5rem 1rem;
}
.flex-box {
	border-bottom: 1px solid #bbb;
	/* padding: 1rem; */
}
.border-none {
	border: none;
	padding: 0;
}
#bd-top {
	border: 1px solid #000;
	border-bottom: 1px solid #bbb;
}
#bd-bottom {
	border: 1px solid #000;
	border-top: none;
}
</style>
