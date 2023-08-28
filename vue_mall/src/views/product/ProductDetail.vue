<template>
	<div id="product-section">
		<section id="product-info">
			<article class="article">
				<ToggleImage :image="product.detailImage" />
			</article>
			<article class="article">
				<h4 id="detail-title">{{ product.name }}</h4>
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
					<select>
						<option v-for="{ size } in product.stock" :key="size">
							{{ size }}
						</option>
					</select>
				</div>
				<div>
					<div v-for="option in product.stock" :key="option">
						<div
							v-if="
								typeof option.size === 'number' || option.size.includes('FREE')
							"
						>
							<span>{{ product.name }} ({{ option.size }})</span>
							<div class="flex-box size-button-wrap">
								<button><i class="fa-solid fa-minus"></i></button>
								<span>{{ option.selected }}</span>
								<button><i class="fa-solid fa-plus"></i></button>
							</div>
						</div>
						<div v-if="typeof option.size === 'string'"></div>
					</div>
				</div>
				<div class="flex-box button-wrap">
					<button>CART</button>
					<button>BUY</button>
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
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { getPostById } from '@/api/index.js';
import ToggleImage from '@/components/product/ToggleImage.vue';

const product = ref({});
const route = useRoute();

const fetchedItem = async () => {
	const data = await getPostById(parseInt(route.params.id));
	product.value = data;
};
fetchedItem();
</script>

<style scoped>
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
	width: 40%;
	/* background-color: #ff0; */
	padding: 7rem 0;
}
#detail-title {
	font-size: 1.5rem;
	font-weight: bold;
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
	width: 5rem;
}
select {
	width: 52%;
	height: 3rem;
	outline: none;
}
.flex-box {
	margin-bottom: 2rem;
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
