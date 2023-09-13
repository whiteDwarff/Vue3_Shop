<template>
	<div>
		<div id="grid-box">
			<ProductCard
				v-for="item in products"
				:key="item.id"
				:title="item.name"
				:price="item.price"
				:image="item.detailImage[0]"
				@click="moveDetailPage(item.id)"
				class="grid-item"
			/>
		</div>
	</div>
</template>

<script setup>
import ProductCard from '@/components/product/ProductCard.vue';
import { useProductStore } from '@/store/product.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

// ------------------------------------------------------------------
const store = useProductStore();
const router = useRouter();

store.fetchedProduct();
const { products } = storeToRefs(store);
// 상세페이지로 이동
const moveDetailPage = id => {
	router.push({
		name: 'productDetail',
		params: { id },
	});
};
</script>

<style scoped>
#grid-box {
	width: 70%;
	margin: 16rem auto 0 auto;
	display: grid;
	grid-template-columns: repeat(3, 1fr);
	grid-auto-rows: repeat(3, 1fr);
	gap: 1rem;
}
.grid-item {
	text-align: center;
	cursor: pointer;
}
</style>
