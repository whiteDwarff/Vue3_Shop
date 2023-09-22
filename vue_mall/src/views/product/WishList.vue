<template>
	<section class="wrap">
		<ul id="table-header" class="flex-box">
			<li class="order-date font">주문일자</li>
			<li class="info-box font">주문정보</li>
			<li class="order-state font">주문상태</li>
		</ul>
		<template v-if="wishList.length">
			<div v-for="(item, i) in wishList" :key="item.id">
				<ProductLabel :item="item" class="border-grey">
					<template #header>
						<div class="order-date">
							<input
								@click="addSelectItem(item.id)"
								:value="item.id"
								type="checkbox"
								class="checkbox"
							/>
						</div>
					</template>
					<template #footer>
						<div class="order-state flex-box space-between align-center">
							<div class="font">{{ item.date }}</div>
							<button @click="deleteItem(i)" class="delete-button pointer">
								삭제
							</button>
						</div>
					</template>
				</ProductLabel>
			</div>
			<div>
				<button @click="deleteSelectItem">선택삭제</button>
				<button @click="deleteAllItem">모두삭제</button>
			</div>
		</template>
		<template v-else>
			<div>등록된 상품이 없습니다.</div>
		</template>
	</section>
</template>

<script setup>
import { useWishStore } from '@/store/wish';
import { storeToRefs } from 'pinia';
import ProductLabel from '@/components/product/ProductLabell.vue';

const store = useWishStore();
const { wishList } = storeToRefs(store);
// ------------------------------------------------------------------
const basket = [];
// ------------------------------------------------------------------
// 하나의 상품 삭제
const deleteItem = index => {
	return confirm('상품을 삭제하시겠습니까?')
		? wishList.value.splice(index, 1)
		: '';
};
const addSelectItem = id => {
	if (!basket.includes(id)) basket.push(id);
	else {
		const index = basket.indexOf(id);
		basket.splice(index, 1);
	}
};
const deleteSelectItem = () => {
	if (confirm('선택한 상품을 선택하시겠습니까?')) {
		const newArray = wishList.value.reverse();
		for (let i = 0; i < basket.length; i++) {
			newArray.splice(basket[i], 1);
		}
		wishList.value = newArray.reverse();
	}
};
// 모든 상품 삭제
const deleteAllItem = () => {
	return confirm('모든 상품을 삭제하시겠습니까?') ? (wishList.value = []) : '';
};
</script>

<style scoped>
.wrap {
	width: 60%;
}
#table-header {
	padding: 2rem 0;
	border-top: 1px solid #000;
	border-bottom: 1px solid #000;
}
.order-state {
	width: 50%;
}
.checkbox {
	display: block;
	width: 1.7rem;
	height: 1.7rem;
}
.delete-button {
	padding: 0.7rem 1rem;
	border: none;
	border-radius: 5px;
	background-color: #000;
	color: #fff;
}
</style>
