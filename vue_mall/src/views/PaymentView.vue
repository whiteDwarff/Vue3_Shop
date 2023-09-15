<template>
	<section class="wrap">
		<!-- 배송지 정보 -->
		<GuideTitle title="배송지" />
		<article id="user-info">
			<p class="bold">
				<span class="color-blue">[기본]</span> {{ accountInfo.name }}
			</p>
			<p>{{ totalAdress }}</p>
			<p class="border-box">{{ totalTel }}</p>
			<!-- 배송 메시지 컴포넌트 -->
			<PostMessage v-model:postMessage="postMessage" />
		</article>

		<!-- 주문상품 정보  -->
		<GuideTitle title="주문상품" />
		<ProductLabel>
			<template #footer> </template>
		</ProductLabel>

		<!-- 할인 및 부가결제 -->
		<GuideTitle title="할인/부가결제" />
		<article id="point-box">
			<div id="point-wrap" class="flex-box align-center">
				<label for="point">적립금</label>
				<div class="flex-box">
					<input
						v-model.number="point"
						@keyup="pointInput"
						id="point"
						type="text"
					/>
					<button @click="addPoint" class="pointer">전액 사용</button>
				</div>
			</div>
			<div id="detail-point">
				보유 잔액
				<span class="color-blue"
					>{{ accountInfo.point.toLocaleString() }}원</span
				>
			</div>
		</article>

		<!-- 결제정보 -->
		<GuideTitle title="결제정보" />
		<article id="price-info">
			<div class="flex-box space-between">
				<span>주문상품</span>
				<span>{{ totalPrice.toLocaleString() }}원</span>
			</div>
			<div class="flex-box space-between">
				<span>배송비</span>
				<span>+{{ product.delivery }}원</span>
			</div>
			<div class="flex-box space-between">
				<span>할인/부가결제</span>
				<span
					><span class="color-red">-{{ point.toLocaleString() }}</span
					>원</span
				>
			</div>
		</article>

		<!-- 결제수단 -->
		<GuideTitle title="결제수단" />
		<CashReceiptView
			v-model:cashReceipt="cashReceipt"
			v-model:cashReceiptInfo="cashReceiptInfo"
			:ownerBank="ownerBank"
		/>
	</section>
</template>

<script setup>
import PostMessage from '@/components/payment/PostMessage.vue';
import GuideTitle from '@/components/payment/GuideTitle.vue';
import CashReceiptView from '@/components/payment/CashReceiptView.vue';
import ProductLabel from '@/components/product/ProductLabel.vue';
import { useUserInfoStore } from '@/store/user';
import { useProductStore } from '@/store/product';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

// -----------------------------------------------------------
const userStore = useUserInfoStore();
const { accountInfo } = storeToRefs(userStore);
const totalAdress = userStore.totalAdress;
const totalTel = userStore.totalTel;
// -----------------------------------------------------------
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
// -----------------------------------------------------------
const postMessage = ref('-- 메시지 선택 (선택사항) --');

const point = ref(0);
const addPoint = () => {
	point.value = accountInfo.value.point;
};
const pointInput = () => {
	if (point.value > accountInfo.value.point) {
		point.value = 0;
		alert(
			`보유중인 적립금은 ${accountInfo.value.point.toLocaleString()}원 입니다.`,
		);
	}
};
// -----------------------------------------------------------
const totalPrice = ref(0);
const sumPrice = () => {
	let sum = 0;
	product.value.stock.forEach(el => {
		if (el.select) sum += el.select;
	});
	totalPrice.value = sum * product.value.price;
};
sumPrice();
// -----------------------------------------------------------
const ownerBank = ref('하나은행 : 28791036517807 강문호');
const cashReceipt = ref('신청안함');
const cashReceiptInfo = ref('individual');
</script>

<style scoped>
.wrap {
	width: 50%;
}
section {
	background-color: #f3f3f3;
}
article {
	margin-bottom: 6rem;
	padding: 3rem 0;
	background-color: #fff;
}
#user-info * {
	font-size: 1.5rem;
	margin-bottom: 2rem;
}
.color-blue {
	color: #3971ff;
}
.border-box {
	border-bottom: 1px solid #ccc;
	color: #636363;
	padding-bottom: 3rem;
}
.guide-title {
	font-size: 1.6rem;
}
/* point */
#point-wrap {
	width: 100%;
}
#point-wrap label {
	font-size: 1.5rem;
	width: 10%;
}
#point-wrap div {
	width: 90%;
	border: 1px solid #bbb;
}
#point {
	width: 80%;
	padding-right: 3%;
	font-size: 1.5rem;
	border: none;
	outline: none;
	text-align: right;
	color: #3971ff;
}
#point-wrap div button {
	width: 20%;
	padding: 1% 0;
	border: none;
	border-left: 1px solid #bbb;
	font-size: 1.5rem;
	background-color: #fff;
}
#detail-point {
	font-size: 1.4rem;
	color: #333;
	display: block;
	margin: 1rem 0;
	text-align: right;
}
#price-info div {
	margin-bottom: 1rem;
}
#price-info div span {
	font-size: 1.5rem;
}
.color-red {
	color: #f00;
	font-weight: bold;
}
</style>
