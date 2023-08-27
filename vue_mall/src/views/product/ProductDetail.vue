<template>
	<div id="product-section">
		<!-- {{ product }} -->
		<section id="product-info">
			<article></article>
			<article>
				<h4>{{ product.name }}</h4>
				<!-- <span>{{ product.price.toLocaleString() }}원</span> -->
				<div class="flex-box">
					<span>적립</span>
					<span>{{ product.mileage }}%</span>
				</div>
				<div class="flex-box">
					<span>배송비</span>
					<!-- <span>{{ product.delivery }}</span> -->
					<span>{{ deliveryReplace(product.delivery) }}</span>
				</div>
				<div class="flex-box">
					<span>OPTION</span>
					<select>
						<option v-for="{ size } in product.stock" :key="size">
							{{ size }} SIZE
						</option>
					</select>
				</div>
				<div class="flex-box">
					<button>WISH</button>
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

const product = ref({});
const route = useRoute();

const deliveryReplace = price => {
	return price ? price : '무료';
};

const fetchedItem = async () => {
	const data = await getPostById(parseInt(route.params.id));
	product.value = data;
	console.log(product);
};
fetchedItem();
</script>

<style scoped>
#product-section {
	width: 70%;
	margin: 16rem auto 0 auto;
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
}
</style>
