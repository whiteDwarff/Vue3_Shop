<template>
	<div>
		PRODUCTS
		{{ products }}
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
		<br />
	</div>
</template>

<script setup>
import { getProductList } from '@/api/index.js';
import { ref } from 'vue';

const products = ref({});

const fetchedProduct = async () => {
	const { data } = await getProductList();
	try {
		console.dir(data);
		products.value = { ...data };
	} catch (err) {
		console.log(err);
	}
};
console.log(products);
fetchedProduct();
</script>

<style lang="scss" scoped></style>
