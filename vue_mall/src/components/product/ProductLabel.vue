<template>
	<article>
		<h3>주문상품</h3>
		<!-- label -->
		<template v-for="item in product.stock" :key="item">
			<div v-if="item.select" class="flex-box justify-content align-item">
				<img :src="labelImage" alt="" />
				<div>
					<!-- item title -->
					<span>{{ item.name }}</span>
					<!-- item info -->
					<span>[옵션 : {{ item.size }}]</span>
					<span>수량 : {{ item.select }}개</span>
					<span>{{
						product.price * item.select.toLocaleString() + ' 원'
					}}</span>
				</div>
			</div>
		</template>

		<div>
			<span>배송비 </span>
			<span>{{ product.delivery ? product.delivery + '원 ' : '무료' }} </span>
		</div>
	</article>
</template>

<script setup>
import { useProductStore } from '@/store/product';
import { storeToRefs } from 'pinia';
const store = useProductStore();
const { product } = storeToRefs(store);
const labelImage = store.labelImage;
</script>

<style lang="scss" scoped></style>
