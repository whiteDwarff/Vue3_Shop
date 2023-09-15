<template>
	<article id="product-label">
		<slot name="header"></slot>
		<!-- label -->
		<template v-for="item in product.stock" :key="item">
			<div v-if="item.select" class="flex-box justify-content align-item">
				<img :src="labelImage" alt="" />
				<div id="option-box">
					<!-- item title -->
					<span class="bold">{{ product.name }}</span>
					<!-- item info -->
					<span
						class="color-grey"
						id="option"
						v-if="typeof item.size === 'string'"
						>[옵션 : {{ item.size }}]</span
					>
					<span class="color-grey" id="option" v-else
						>[옵션 : {{ item.size + ' SIZE' }}]</span
					>
					<span class="color-grey"> 수량 : {{ item.select }}개</span>
					<span>{{
						(product.price * item.select).toLocaleString() + ' 원'
					}}</span>
				</div>
			</div>
		</template>

		<slot name="footer"></slot>
		<!-- <div>
			<span>배송비 </span>
			<span>{{ product.delivery ? product.delivery + '원 ' : '무료' }} </span>
		</div> -->
	</article>
</template>

<script setup>
import { useProductStore } from '@/store/product';
import { storeToRefs } from 'pinia';
const store = useProductStore();
const { product } = storeToRefs(store);
const labelImage = store.labelImage;
</script>

<style scoped>
#product-label {
	height: 5%;
}
#product-label span {
	font-size: 1.5rem;
}
img {
	min-width: 110px;
	width: 15%;
	height: 15%;
	/* border: 1px solid #000; */
}
span {
	display: block;
	margin-bottom: 2rem;
}
.bold {
	margin-top: 3rem;
}
#option-box {
	padding-left: 4rem;
}
#option {
	margin-bottom: -0.1rem;
}
.align-item {
	margin-bottom: 1rem;
}
.color-grey {
	color: #333;
}
</style>
