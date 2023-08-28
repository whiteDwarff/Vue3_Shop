<template>
	<div>
		<article class="main-image-box">
			<img class="main-image" :src="image" alt="" />
		</article>
		<article>
			<span class="card-title">{{ title }}</span>
			<span class="card-price">{{ price.toLocaleString() }}원</span>
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
});
</script>

<style>
.main-image-box {
	overflow: hidden;
}
.main-image {
	text-align: center;
	width: 80%;
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
