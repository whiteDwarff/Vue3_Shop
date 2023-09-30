<template>
	<section class="wrap">
		<h3 class="sub-title font bold">WISH LIST</h3>
		<ul id="table-header" class="flex-box">
			<li class="info-box font-label">상품정보</li>
			<li class="order-state font-label">등록일자</li>
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
								class="checkbox pointer"
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
			<div id="button-wrap">
				<button @click="deleteSelectItem" class="pointer">선택삭제</button>
				<button @click="deleteAllItem" class="pointer">모두삭제</button>
			</div>
		</template>
		<template v-else>
			<div id="none-wish" class="font-label">
				<span>관심 상품이 없습니다.</span>
			</div>
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
	if (!basket.includes(id)) {
		basket.push(id);
	} else {
		const index = basket.indexOf(id);
		basket.splice(index, 1);
	}
};
const deleteSelectItem = () => {
	const newArr = [];
	if (!basket.length) alert('선택된 상품이 없습니다.');
	// basket.forEach((item, i) => {
	// 	wishList.value.reverse().forEach((list, j) => {
	// 		if (item == list.id) {
	// 			wishList.value.splice(j, 1);
	// 			basket.splice(i, 1);
	// 			console.log(item, list);
	// 			console.log(basket, wishList.value);
	// 		}
	// 	});
	else {
		basket.forEach(i => {
			wishList.value.forEach(j => {
				if (i == j.id) {
					newArr.push(i);
				}
			});
		});
		newArr.forEach(i => {
			basket.splice(i, 1);
			wishList.value.splice(i, 1);
		});
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

#table-header .info-box {
	margin-left: 4rem;
	width: 100%;
}
.checkbox {
	width: 1.7rem;
	height: 1.7rem;
}
.order-state {
	width: 50%;
}
.delete-button {
	padding: 0.3rem 0.3rem;
	border: none;
	border-radius: 5px;
	background-color: #333;
	color: #fff;
	font-weight: 200;
}
#button-wrap {
	width: 30%;
	margin: 5rem 0 0 auto;
}
#button-wrap button {
	width: 45%;
	height: 5rem;
	border-radius: 0.6rem;
	border: none;
	color: #fff;
	background-color: #000;
	font-weight: bold;
}
#button-wrap button:first-child {
	background-color: #fff;
	color: #000;
	border: 1px solid #000;
	margin-right: 10%;
}
#none-wish {
	margin-top: 5rem;
	text-align: center;
}
</style>
