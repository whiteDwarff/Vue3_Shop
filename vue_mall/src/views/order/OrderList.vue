<template>
	<div class="wrap">
		<ul id="table-header" class="flex-box">
			<li class="order-date font">주문일자</li>
			<li class="info-box font">주문정보</li>
			<li class="order-state font">주문상태</li>
		</ul>
		<div v-for="(list, i) in orderList" :key="i">
			<template v-if="list.productInfo.length > 1">
				<ProductLabel
					:item="list.productInfo[i]"
					:ohter="`외 ${list.productInfo.length - 1}건`"
					class="border-grey"
				>
					<!-- slot header -->
					<template #header>
						<div class="order-date">
							<span class="font order-date">{{ list.orderInfo.date }}</span>
							<span @click="moveOrderHistory(i)" class="font pointer"
								>[주문 상세 내용]</span
							>
						</div>
						<!-- slot footer -->
					</template>
					<template #footer>
						<div class="order-state">
							<span class="font order-state blue bold">{{
								list.orderInfo.state
							}}</span>
						</div>
					</template>
				</ProductLabel>
			</template>

			<template v-else>
				<ProductLabel
					v-for="item in list.productInfo"
					:key="item"
					:item="item"
					class="border-grey"
				>
					<!-- slot header -->
					<template #header>
						<div class="order-date">
							<span class="font order-date">{{ list.orderInfo.date }}</span>
							<span @click="moveOrderHistory(i)" class="font pointer"
								>[주문 상세 내용]</span
							>
						</div>
						<!-- slot footer -->
					</template>
					<template #footer>
						<div class="order-state">
							<span class="font order-state blue bold">{{
								list.orderInfo.state
							}}</span>
						</div>
					</template>
				</ProductLabel>
			</template>
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
#table-header {
	padding: 2rem 0;
	border-top: 1px solid #000;
	border-bottom: 1px solid #000;
}

.wrap {
	width: 60%;
}
.info-box {
	width: 80%;
	margin: auto 0;
}
.order-date {
	width: 20%;
	text-align: center;
	margin: auto 0;
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
