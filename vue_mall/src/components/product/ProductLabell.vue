<template>
	<div class="flex-box product-label">
		<template
			v-if="
				item.size === 'FREE' || (typeof item.size === 'number' && item.select)
			"
		>
			<img :src="item.image" @click="moveDetailPage(item.id)" class="pointer" />
			<div class="info-box">
				<span class="font bold">{{ item.name }}</span>
				<span v-if="typeof item.size === 'number'" class="font"
					>[옵션 : {{ item.size }} SIZE]</span
				>
				<span v-else class="font">[옵션 : {{ item.size }}]</span>
				<span class="font count">수량: {{ item.select }}개</span>
				<span class="font">{{ item.price.toLocaleString() }}원</span>
			</div>
		</template>
	</div>
</template>

<script setup>
import { useRouter } from 'vue-router';

defineProps({
	item: Object,
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
	padding: 0 5rem;
	margin: auto 0;
}
.info-box span:last-child {
	margin: 0;
}

.count {
	margin-top: -1rem;
}
span {
	display: block;
	margin-bottom: 0.7rem;
}
</style>
