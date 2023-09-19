<template>
	<form class="wrap" @submit.prevent="buyNow">
		<!-- 배송지 정보 -->
		<GuideTitle
			title="배송지"
			v-model:option="isDisplayOption.post"
			@updateOption="isDisplayOption.post = $e"
		/>
		<article id="user-info" v-if="isDisplayOption.post">
			<p class="bold">
				<span class="color-blue">[기본]</span> {{ accountInfo.name }}
			</p>
			<p>{{ totalAdress }}</p>
			<p class="border-box">{{ totalTel }}</p>
			<!-- 배송 메시지 컴포넌트 -->
			<PostMessage
				v-model:postMessage="postMessage"
				v-model:requestMessage="postRequestMessage"
			/>
		</article>

		<!-- 주문상품 정보  -->
		<GuideTitle
			title="주문상품"
			v-model:option="isDisplayOption.product"
			@updateOption="isDisplayOption.product = $e"
		/>
		<template v-if="isDisplayOption.product">
			<article>
				<ProductLabell v-for="item in count" :key="item" :item="item">
				</ProductLabell>
			</article>
		</template>

		<!-- 할인 및 부가결제 -->
		<GuideTitle
			title="할인/부가결제"
			v-model:option="isDisplayOption.pointInfo"
			@updateOption="isDisplayOption.pointInfo = $e"
		/>
		<article id="point-box" v-if="isDisplayOption.pointInfo">
			<div id="point-wrap" class="flex-box align-center">
				<label for="point">적립금</label>
				<div class="flex-box">
					<input
						v-model.number="point"
						@keyup="pointInput"
						id="point"
						type="text"
					/>
					<button @click.prevent="addPoint" class="pointer">전액 사용</button>
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
		<GuideTitle
			title="결제정보"
			v-model:option="isDisplayOption.priceInfo"
			@updateOption="isDisplayOption.priceInfo = $e"
		/>
		<article id="price-info" v-if="isDisplayOption.priceInfo">
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
					><span class="red bold">-{{ point.toLocaleString() }}</span
					>원</span
				>
			</div>
		</article>

		<!-- 결제수단 -->
		<GuideTitle
			title="결제수단"
			v-model:option="isDisplayOption.bankInfo"
			@updateOption="isDisplayOption.bankInfo = $e"
		/>
		<CashReceiptView
			v-if="isDisplayOption.bankInfo"
			v-model:cashReceipt="cashReceipt"
			v-model:cashReceiptInfo="cashReceiptInfo"
			v-model:firstNumber="number.firstNumber"
			v-model:middleNumber="number.middleNumber"
			v-model:lastNumber="number.lastNumber"
			v-model:businessesNumber="businessesNumber"
			v-model:depositName="depositName"
			:ownerBank="ownerBank"
		/>

		<!-- 적립 혜택 -->
		<GuideTitle
			title="적립 혜택"
			v-model:option="isDisplayOption.credit"
			@updateOption="isDisplayOption.credit = $e"
		/>
		<article v-if="isDisplayOption.credit">
			<div class="flex-box space-between">
				<span class="font">상품별 적립금</span>
				<span class="font">{{ (totalPrice * 0.01).toLocaleString() }}원</span>
			</div>
		</article>

		<article id="submit-box">
			<h2 class="font">주문 내용을 확인하였으며 약관에 동의합니다.</h2>
			<button id="submit-button" class="pointer font">
				{{ finalPrice.toLocaleString() }}원 결제하기
			</button>
		</article>
	</form>
</template>

<script setup>
import PostMessage from '@/components/payment/PostMessage.vue';
import GuideTitle from '@/components/payment/GuideTitle.vue';
import CashReceiptView from '@/components/payment/CashReceiptView.vue';
import ProductLabell from '@/components/product/ProductLabell.vue';
import currentDate from '@/utils/date';
import { useUserInfoStore } from '@/store/user';
import { useProductStore } from '@/store/product';
import { useOrderListStore } from '@/store/order';
import { storeToRefs } from 'pinia';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

// -----------------------------------------------------------
// pinia import
const userStore = useUserInfoStore();
const { accountInfo } = storeToRefs(userStore);
const totalAdress = userStore.totalAdress;
const totalTel = userStore.totalTel;
// -----------------------------------------------------------
const productStore = useProductStore();
const { product } = storeToRefs(productStore);
const { products } = storeToRefs(productStore);
// const labelImage = productStore.labelImage;
// -----------------------------------------------------------
const orderListStore = useOrderListStore();
const { orderList } = storeToRefs(orderListStore);
// -----------------------------------------------------------
// default 배송 옵션 (select)
const postMessage = ref('-- 메시지 선택 (선택사항) --');
// 요청사항 (input)
const postRequestMessage = ref('');

const addPostMessage = computed(() => {
	return postMessage.value === '직접 입력'
		? postRequestMessage.value
		: postMessage.value;
});
// -----------------------------------------------------------
// 적립금 사용란
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
// 상품의 총 금액
const totalPrice = ref(0);
const sumPrice = () => {
	let sum = 0;
	product.value.stock.forEach(el => {
		if (el.select) sum += el.select;
	});
	totalPrice.value = sum * product.value.price;
};
sumPrice();
const finalPrice = computed(() => {
	return totalPrice.value - point.value;
});
// -----------------------------------------------------------
// 현금영수증 발급
const ownerBank = ref('[하나은행] 28791036517807 강문호');
const cashReceipt = ref('false');
const depositName = ref('');
const cashReceiptInfo = ref('individual');

//현금영수증 개인번호
const number = ref({
	firstNumber: '010',
	middleNumber: '',
	lastNumber: '',
});
// 현금영수증 사업자번호
const businessesNumber = ref('');
const addNumberInfo = computed(() => {
	return cashReceiptInfo.value === 'individual'
		? number.value
		: businessesNumber.value;
});
// -----------------------------------------------------------
const count = ref([]);
const addCount = () => {
	product.value.stock.forEach(el => {
		if (el.select) {
			const obj = {
				id: product.value.id,
				name: product.value.name,
				image: product.value.detailImage[0],
				price: product.value.price,
				size: el.size,
				select: el.select,
			};
			count.value.push(obj);
		}
	});
};
addCount();

// -----------------------------------------------------------
// 버튼 클릭 시 요소 숨김
const isDisplayOption = ref({
	post: true,
	product: true,
	pointInfo: true,
	priceInfo: true,
	bankInfo: true,
	credit: true,
});
// -----------------------------------------------------------
// 결제 버튼 클릭 시 제품 수량 최신화
const productsUpdate = () => {
	let salesCount = 0;
	products.value.forEach(el => {
		if (el.name === product.value.name) {
			el.stock.forEach((item, i) => {
				if (typeof item.count === 'number' && item.count) {
					item.count -= product.value.stock[i].select;
					item.select = 0;
					salesCount += item.count;
				}
				if (!salesCount) el.sales = false;
			});
		}
	});
};
// -----------------------------------------------------------
const router = useRouter();
const buyNow = () => {
	if (depositName.value === '') alert('입금자명을 입력해주세요.');
	else {
		// 주문 내역
		const newOrderInfo = ref({
			id: orderList.value.length,
			orderInfo: {
				date: currentDate.value,
				state: '입금전',
				userName: accountInfo.value.name,
			},
			paymentInfo: {
				totalPrice: totalPrice.value,
				usePoint: point.value,
				finalPrice: finalPrice.value,
				bankInfo: ownerBank.value,
				depositName: depositName.value,
			},
			productInfo: [...count.value],
			receiptInfo: {
				cashReceipt: cashReceipt.value,
				cashReceiptInfo: cashReceiptInfo.value,
				receiptNumber: addNumberInfo.value,
			},
			postInfo: {
				userName: accountInfo.value.name,
				adress: totalAdress,
				tel: totalTel,
				postMessage: addPostMessage.value,
			},
		});
		// 사용자 적립금 최신화
		accountInfo.value.point =
			accountInfo.value.point - point.value + totalPrice.value * 0.01;
		// 상품 수량 최신화
		productsUpdate();

		orderList.value.unshift(newOrderInfo.value);
		// product 초기화
		// product.value = {};
		router.push({
			name: 'orderHistory',
			params: { id: newOrderInfo.value.id },
		});
	}
};
</script>

<style scoped>
article {
	margin-bottom: 4rem;
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
#submit-box {
	text-align: center;
}
#submit-button {
	width: 100%;
	padding: 1rem;
	margin: 2rem 0;
	color: #fff;
	border: none;

	background-color: #3971ff;
}
</style>
