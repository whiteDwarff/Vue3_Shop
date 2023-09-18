<template>
	<section class="wrap">
		<h3 class="bold" id="title">주문상세조회</h3>

		<!-- 주문정보 -->
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

		<!-- 주문 상품 정보 -->
		<h4 class="bold font">주문 상품 정보</h4>
		<article>
			<ProductLabell
				v-for="item in orderInfo.productInfo"
				:key="item"
				:item="item"
			/>
		</article>
		<!-- 결제 정보 -->
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

		<!-- 현금영수증 -->
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

		<!-- 배송지정보 -->
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
		<div id="button-wrap">
			<button @click="moveMainPage" class="bold pointer">홈으로</button>
			<button @click="moveListPage" class="bold pointer">주문내역</button>
		</div>
	</section>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useOrderListStore } from '@/store/order';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import ProductLabell from '@/components/product/ProductLabell.vue';
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
const router = useRouter();
const moveMainPage = () => {
	router.push({
		name: 'products',
	});
};
const moveListPage = () => {
	router.push({
		name: 'orderList',
	});
};
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
}
.border-none {
	border: none;
	padding: 0;
}
.product-label:first-child {
	border-top: 1px solid #bbb;
}
#bd-top {
	border: 1px solid #000;
	border-bottom: 1px solid #bbb;
}
#bd-bottom {
	border: 1px solid #000;
	border-top: none;
}
#button-wrap {
	padding: 3rem 0;
}
#button-wrap button {
	width: 45%;
	margin-right: 10%;
	padding: 1rem;
	border: none;
	background-color: #fff;
}
#button-wrap button:first-child {
	border: 1px solid #000;
	border-radius: 10px;
}
#button-wrap button:last-child {
	margin-right: 0;
	background-color: #000;
	color: #fff;
	border-radius: 10px;
}
</style>
