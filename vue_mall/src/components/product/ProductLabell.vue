<template>
	<div class="flex-box product-label">
		<slot name="header"></slot>
		<img
			v-if="item.image"
			:src="item.image"
			@click="moveDetailPage(item.id)"
			class="pointer"
		/>
		<div class="info-box font">
			<div class="flex-box align-bottom">
				<span class="bold">{{ item.name }}</span>
				<span v-if="ohter" id="ohter" class="bold font-label grey">
					외 {{ ohter }}건
				</span>
			</div>
			<span v-if="item.size" class="grey font-label"
				>[옵션 : {{ item.size }}]</span
			>
			<span v-if="item.select" class="count grey font-label"
				>수량: {{ item.select }}개</span
			>
			<span class="font">{{ item.price.toLocaleString() }}원</span>
		</div>

		<slot name="footer"></slot>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
	item: Object || '',
	ohter: String || '',
});
const router = useRouter();
const moveDetailPage = id => {
	router.push({
		name: 'productDetail',
		params: { id },
	});
};
</script>

<style scoped>
img {
	min-width: 96px;
	width: 10%;
	height: 10%;
}
.info-box {
	width: 60%;
	padding: 0 5rem;
	margin: auto 0;
}
.info-box div:first-child span:first-child {
	margin-bottom: 1rem;
}
#ohter {
	margin-left: 1rem;
}
.info-box span:last-child {
	margin: 0;
}
.count {
	margin-top: -0.5rem;
}
span {
	display: block;
	margin-bottom: 0.7rem;
}
</style>
