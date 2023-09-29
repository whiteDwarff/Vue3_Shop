<template>
	<div>
		<article class="main-image-box">
			<img class="main-image" :src="image" alt="" />
		</article>
		<article>
			<span class="card-title">{{ title }}</span>
			<span class="card-price">{{ price.toLocaleString() }}원</span>
			<span v-if="!sales" class="red">out of stock</span>
		</article>
	</div>
</template>

<script setup>
defineProps({
	title: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
	sales: {
		type: Boolean,
		required: true,
	},
});
</script>

<style>
.main-image-box {
	overflow: hidden;
}
.main-image {
	/* max-height: 525.53px;
	min-height: 525.53px; */
	text-align: center;
	width: 80%;
	min-height: 525.53px;
	transition: 0.5s ease-in-out;
}
.main-image:hover {
	transform: scale(1.05);
	transition: 0.5s ease-in-out;
}
.card-title {
	margin-bottom: 1rem;
}
.card-title,
.card-price {
	display: block;
	font-size: 1.3rem;
}
</style>
