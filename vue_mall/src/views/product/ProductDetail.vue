<template>
	<div id="product-section">
		<section id="product-info">
			<article class="article">
				<ToggleImage :image="product.detailImage" />
			</article>
			<article class="article">
				<h6 id="detail-title">{{ product.name }}</h6>
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
						<!-- v-for와 if문의 중첩은 배제하는게 좋다. -->
						<template v-for="{ size } in product.stock" :key="size">
							<option v-if="typeof size === 'string'" selected>
								{{ size }}
							</option>
							<option v-else-if="typeof size === 'number'">
								{{ size }} SIZE
							</option>
						</template>
					</select>
				</div>
				<!-- 옵션 box -->
				<div class="select-count-box">
					<div v-for="(option, index) in product.stock" :key="index">
						<div
							v-if="typeof option.size === 'number' || option.size == 'FREE'"
							class="thum"
							:class="{
								none:
									!selectedSizes.includes(option.size + ' SIZE') &&
									!selectedSizes.includes('FREE'),
							}"
						>
							<div class="flex-box align-center space-between">
								<h6 class="option-title">
									{{ product.name }} ({{ option.size }})
								</h6>
								<i
									@click="subtractSize(option.size + ' SIZE' || option.size)"
									class="fa-solid fa-xmark delete-button"
								></i>
							</div>
							<div class="flex-box align-center space-between">
								<div class="size-button-wrap flex-box">
									<!-- 수량빼기 버튼 -->
									<button @click="subtractCount(index)">
										<i class="fa-solid fa-minus"></i>
									</button>
									<span>{{ option.select }}</span>
									<!-- 수량 더하기 버튼 -->
									<button @click="addCount(index)" id="add-button">
										<i class="fa-solid fa-plus"></i>
									</button>
								</div>
								<small>
									{{ (product.price * option.select).toLocaleString() }} 원
								</small>
							</div>
						</div>
					</div>
				</div>
				<!-- 사이즈별 옵션 선택란  -->
				<article id="total-price">
					<div class="flex-box space-between align">
						<h4 class="option-title">주문 수량</h4>
						<span> {{ result }} 개 </span>
					</div>
					<div class="flex-box space-between align">
						<h4 class="option-title">총 상품 금액</h4>
						<span> {{ (result * product.price).toLocaleString() }} 원 </span>
					</div>
				</article>
				<!-- 총 금액 -->
				<div class="flex-box button-wrap">
					<button>CART</button>
					<button @click="payment">BUY</button>
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
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';

// const product = ref({});
const result = ref(0);
const route = useRoute();
const size = ref('[필수] 옵션을 선택해주세요.');
const option = ref({ size: 'none' });
const selectedSizes = ref([]);

const store = useProductStore();
store.fetchedItem(parseInt(route.params.id));
const { product } = storeToRefs(store);
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
	option.value.size = newSize.target.value;
	if (!selectedSizes.value.includes(newSize.target.value))
		selectedSizes.value.push(newSize.target.value);
};
// ------------------------------------------------------------------
// x 버튼 누르면 selectedSizes의 배열에서 선택한 사이즈 제거
const subtractSize = size => {
	const findIndex = selectedSizes.value.indexOf(size);
	selectedSizes.value.splice(findIndex, 1);
};
// ------------------------------------------------------------------
// 제품구매
const router = useRouter();
const payment = () => {
	router.push({
		name: 'payment',
	});
};

// fetchedItem();
</script>

<style scoped>
.block {
	display: block;
	transition: 0.5s ease-in;
}
.none {
	display: none;
}
#product-section {
	width: 70%;
	margin: 16rem auto 0 auto;
}
#product-info {
	width: 100%;
	display: flex;
}
.article {
	width: 60%;
}
#product-info article:last-child {
	width: 20%;
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
	font-size: 1.2rem;
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
	width: 15rem;
	height: 5rem;
	border-radius: 0.6rem;
	border: none;
	cursor: pointer;
	color: #fff;
	background-color: #000;
	font-weight: bold;
}
.button-wrap button:first-child {
	background-color: #fff;
	color: #000;
	border: 1px solid #000;
	margin-right: 3rem;
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
