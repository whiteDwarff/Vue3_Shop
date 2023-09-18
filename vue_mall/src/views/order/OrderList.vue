<template>
	<div class="wrap">
		<div v-for="(list, i) in orderList" :key="i">
			<ProductLabel
				v-for="item in list.productInfo"
				:key="item"
				:item="item"
				class="border-grey"
			>
				<template #header>
					<div class="order-date">
						<span class="font order-date">{{ list.orderInfo.date }}</span>
						<span @click="moveOrderHistory(i)" class="font pointer"
							>[주문 상세 내용]</span
						>
					</div>
				</template>
				<template #footer>
					<div class="order-state">
						<span class="font order-state blue bold">{{
							list.orderInfo.state
						}}</span>
					</div>
				</template>
			</ProductLabel>
		</div>
	</div>
</template>

<script setup>
import ProductLabel from '@/components/product/ProductLabell.vue';
import { useOrderListStore } from '@/store/order';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
const store = useOrderListStore();
const { orderList } = storeToRefs(store);

const router = useRouter();
const moveOrderHistory = id => {
	router.push({
		name: 'orderHistory',
		params: { id },
	});
};
</script>

<style scoped>
.wrap {
	width: 70%;
}
.order-date {
	width: 20%;
	/* margin-top: 2.3rem; */
	text-align: center;
	margin: auto 0;
	/* background-color: #ff0; */
}
.order-date span:last-child {
	display: block;
	margin-top: 1rem;
}
.order-date span:last-child:hover {
	text-decoration: underline;
	text-underline-position: under;
}
.order-state {
	width: 10%;
	/* margin-top: 2rem; */
	margin: auto 0;
	/* background-color: #f0f; */
}
</style>
