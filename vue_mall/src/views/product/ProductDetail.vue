<template>
	<div class="product-wrap">
		<section id="product-info">
			<article class="article">
				<ToggleImage :image="product.detailImage" />
			</article>
			<article class="article">
				<div class="flex-box align-bottom">
					<h6 id="detail-title">{{ product.name }}</h6>
					<span v-if="!product.sales" id="sales" class="red">out of stock</span>
				</div>
				<span id="detail-price"
					>{{ product.price ? product.price.toLocaleString() + ' 원' : '무료' }}
				</span>
				<div class="flex-box">
					<span class="margin-right">적립</span>
					<span>{{ product.mileage }}%</span>
				</div>
				<!-- 적립 -->
				<div class="flex-box">
					<span class="margin-right">배송비</span>
					<span>{{ product.delivery || '무료' }}</span>
				</div>
				<!-- 배송비 -->
				<div class="flex-box">
					<span class="margin-right">OPTION</span>
					<select v-model="size" @change="selectSize">
						<option value="- [필수] 옵션을 선택해주세요 -" selected>
							- [필수] 옵션을 선택해주세요 -
						</option>
						<option disabled>--------------------------</option>
						<!-- v-for와 if문의 중첩은 배제하는게 좋다. -->
						<optgroup label="Size">
							<template v-for="item in product.stock" :key="item">
								<option v-if="item.sales" :value="item.size">
									{{ item.size }}
								</option>
								<option v-else :value="item.size">
									{{ item.size }} [품절]
								</option>
							</template>
						</optgroup>
					</select>
				</div>
				<!-- 옵션 box -->
				<div class="select-count-box">
					<div v-for="(option, index) in product.stock" :key="index">
						<div
							class="thum"
							:class="{
								none: !selectedSizes.includes(option.size),
							}"
						>
							<div class="flex-box align-center space-between">
								<h6 class="option-title font-label">
									{{ product.name }} ({{ option.size }})
								</h6>
								<i
									@click="subtractSize(option.size, index)"
									class="fa-solid fa-xmark delete-button"
								></i>
							</div>
							<div class="flex-box align-center space-between">
								<!-- 상품의 재고가 있을 경우  -->
								<template v-if="option.sales">
									<div class="size-button-wrap flex-box">
										<!-- 수량빼기 버튼 -->
										<button @click="subtractCount(index)">
											<i class="fa-solid fa-minus pointer"></i>
										</button>
										<span>{{ option.select }}</span>
										<!-- 수량 더하기 버튼 -->
										<button @click="addCount(index)" id="add-button">
											<i class="fa-solid fa-plus pointer"></i>
										</button>
									</div>
									<small>
										{{ (product.price * option.select).toLocaleString() }} 원
									</small>
								</template>
								<!-- 상품의 재고가 없을 경우 -->
								<template v-else>
									<span>품절</span>
								</template>
							</div>
						</div>
					</div>
				</div>
				<!-- 사이즈별 옵션 선택란  -->
				<article id="total-price">
					<div class="flex-box space-between align">
						<h4 class="option-title font-label">주문 수량</h4>
						<span> {{ result }} 개 </span>
					</div>
					<div class="flex-box space-between align">
						<h4 class="option-title font-label">총 상품 금액</h4>
						<span> {{ (result * product.price).toLocaleString() }} 원 </span>
					</div>
				</article>
				<!-- 총 금액 -->
				<div v-if="!product.sales">
					<button id="sales-button" class="pointer">품절된 상품입니다.</button>
				</div>
				<div v-else class="flex-box button-wrap">
					<button @click="addWish" class="pointer">WISH</button>
					<button @click="payment" class="pointer">BUY</button>
				</div>
			</article>
		</section>
		<section id="image-wrap">
			<img
				v-for="(img, i) in product.image"
				:key="i"
				:src="img"
				class="product-image"
				alt="제품이미지"
			/>
		</section>
	</div>
</template>

<script setup>
import { useProductStore } from '@/store/product';
import { useUserInfoStore } from '@/store/user';
import { useWishStore } from '@/store/wish';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import ToggleImage from '@/components/product/ToggleImage.vue';
import currentDate from '@/utils/date';
// const product = ref({});
const result = ref(0);
const route = useRoute();
const size = ref('- [필수] 옵션을 선택해주세요 -');
const selectedSizes = ref([]);

// product store
const productStore = useProductStore();
productStore.fetchedItem(parseInt(route.params.id));
const { product } = storeToRefs(productStore);
// user store
const userStore = useUserInfoStore();
const { loginUser } = storeToRefs(userStore);
// wish store
const wishStore = useWishStore();
const { wishList } = storeToRefs(wishStore);
// ------------------------------------------------------------------
// 제품 수량 증가
const addCount = index => {
	product.value.stock[index].count <= product.value.stock[index].select
		? alert('상품의 수량이 재고수량 보다 많습니다.')
		: ((product.value.stock[index].select += 1), (result.value += 1));
};
// 제품 수량 빼기
const subtractCount = index => {
	product.value.stock[index].select <= 0
		? alert('최소 주문수량은 1개 입니다.')
		: ((product.value.stock[index].select -= 1), (result.value -= 1));
};
// ------------------------------------------------------------------
// 제품 사이즈 선택
const selectSize = newSize => {
	if (!selectedSizes.value.includes(newSize.target.value))
		selectedSizes.value.push(newSize.target.value);
};
// ------------------------------------------------------------------
// x 버튼 누르면 selectedSizes의 배열에서 선택한 사이즈 제거
const subtractSize = (size, index) => {
	// 현재 선택한 수량
	const currentSelect = product.value.stock[index].select;
	// x를 누르면 선택한 수량 초기화 및 result에서 선택한 수량만큼 빼기
	product.value.stock[index].select = 0;
	result.value -= currentSelect;
	const findIndex = selectedSizes.value.indexOf(size);
	selectedSizes.value.splice(findIndex, 1);
};
// ------------------------------------------------------------------
// cart 및 buy 버튼 클릭 시 이벤트 제어
const router = useRouter();
const add = (routerName, message, addWishList = '') => {
	if (addWishList) {
		addWishList();
	} else {
		return !result.value ? alert(message) : router.push({ name: routerName });
	}
};
// ------------------------------------------------------------------
const addWishList = () => {
	const obj = {
		id: product.value.id,
		name: product.value.name,
		image: product.value.detailImage[0],
		price: product.value.price,
		date: currentDate,
	};
	const basket = [];
	wishList.value.forEach(item => basket.push(item.id));
	if (basket.includes(obj.id)) alert('이미 등록된 상품입니다.');
	else {
		wishList.value.unshift(obj);
		if (confirm('위시리스트로 이동할까요?'))
			return router.push({ name: 'wishList' });
	}
};
// ------------------------------------------------------------------
// 제품구매
const payment = () => {
	return loginUser.value.id == ''
		? router.push({ name: 'login' })
		: add('payment', '최소 주문수량은 1개 입니다.');
};
const addWish = () => add('products', '', addWishList);
</script>

<style scoped>
.block {
	display: block;
	transition: 0.5s ease-in;
}
.none {
	display: none;
}
#sales {
	display: block;
	margin-left: 2rem;
}
#product-info {
	width: 100%;
	display: flex;
}
.article {
	width: 60%;
}
#product-info article:last-child {
	width: 40%;
	padding: 7rem 0;
}
#detail-title {
	font-size: 1.5rem;
}
#detail-price {
	display: block;
	margin: 2rem 0;
}
#image-wrap {
	width: 100%;
	text-align: center;
}
.product-image {
	width: 80%;
	margin-bottom: 2rem;
	object-fit: cover;
}
#product-info span {
	display: block;
	font-size: 1.3rem;
}
.margin-right {
	width: 7rem;
}
select {
	width: 80%;
	height: 3rem;
	outline: none;
}
.select-count-box {
	border-bottom: 1px solid #ccc;
	margin: 5rem 0;
}
.thum {
	border-top: 1px solid #ccc;
	padding: 3rem 0;
}
.option-title {
	font-weight: 600;
	margin-bottom: 1rem;
}
#total-price {
	padding-bottom: 3rem;
}
.delete-button {
	padding: 0.2rem;
	cursor: pointer;
}
.button-wrap button {
	width: 45%;
	height: 5rem;
	border-radius: 0.6rem;
	border: none;
	color: #fff;
	background-color: #000;
	font-weight: bold;
}
#sales-button {
	width: 100%;
	background-color: #ccc;
	color: #fff;
	border: none;
	height: 5rem;
	border-radius: 0.6rem;
}
.button-wrap button:first-child {
	background-color: #fff;
	color: #000;
	border: 1px solid #000;
	margin-right: 10%;
}
.size-button-wrap {
	text-align: center;
	line-height: 3rem;
}
.size-button-wrap > * {
	width: 3rem;
	height: 3rem;
	color: #000;
	background-color: #fff;
	font-size: 1rem;
	border: 1px solid #ccc;
}
.size-button-wrap > span {
	border: none;
}
</style>
