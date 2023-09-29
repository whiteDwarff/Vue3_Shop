<template>
	<section class="wrap">
		<h3 class="sub-title font bold">MY SHOPPING</h3>
		<!-- 주문현황 -->
		<article id="order-state" class="font">
			<h4 class="bold border-grey">
				나의 주문처리 현황<span class="ccc font-label"
					>(최근 <span class="blue bold">3개월</span>기준)</span
				>
			</h4>
			<div id="order-wrap" class="flex-box space-between">
				<div class="thum bold">
					입금전
					<span class="blue bold">{{ orderList.length }}</span>
				</div>
				<div class="thum bold">
					배송준비중
					<span class="blue bold">0</span>
				</div>
				<div class="thum bold">
					배송중
					<span class="blue bold">0</span>
				</div>
				<div class="thum bold">
					배송완료
					<span class="blue bold">0</span>
				</div>
				<div class="thum font-label font">
					<li>취소 : <span class="blue bold">0</span></li>
					<li>교환 : <span class="blue bold">0</span></li>
					<li>반품 : <span class="blue bold">0</span></li>
				</div>
			</div>
		</article>
		<!-- 상세정보 -->
		<article id="my-info" class="font">
			<!-- 회원정보 -->
			<div id="info-wrap" class="flex-box space-between">
				<router-link :to="{ name: 'join', params: { title: 'UPDATE INFO' } }">
					<img
						src="/sample-image/profile.png"
						class="image"
						alt="PROFILE 이미지"
					/>
					<h4 class="font bold">PROFILE</h4>
					<span class="font-label">회원 정보</span>
					<p class="grey font-label">
						회원이신 고객님의 개인정보를<br />관리하는 공간입니다.
					</p>
				</router-link>
				<!-- 주문내역 -->
				<router-link to="orderList">
					<img
						src="/sample-image/order.png"
						class="image"
						alt="PROFILE 이미지"
					/>
					<h4 class="font bold">ORDER</h4>
					<span class="font-label">주문내역 조회</span>
					<p class="grey font-label">
						고객님께서 주문하신 상품의<br />주문내역을 확인하실 수 있습니다.
					</p>
				</router-link>
				<!-- 위시리스트 -->
				<router-link to="wishList">
					<img
						src="/sample-image/gift.png"
						class="image"
						alt="WISHLIST 이미지"
					/>
					<h4 class="font bold">WISHLIST</h4>
					<span class="font-label">관심 상품</span>
					<p class="grey font-label">
						관심상품으로 등록하신<br />상품의 목록을 보여드립니다.
					</p>
				</router-link>
			</div>
		</article>
	</section>
</template>

<script setup>
import { useOrderListStore } from '@/store/order';
import { storeToRefs } from 'pinia';
const orderStore = useOrderListStore();
const { orderList } = storeToRefs(orderStore);
</script>

<style scoped>
#order-state {
	border: 1px solid #000;
	padding: 1.5rem;
}
#order-state h4 {
	padding-bottom: 1.5rem;
}

#order-wrap .thum {
	width: 20%;
	padding-top: 1.5rem;
	text-align: center;
	border-right: 1px dotted #ccc;
}
#order-wrap .thum:last-child {
	border: none;
}
#order-wrap .thum span {
	display: block;
	margin-top: 1.5rem;
}
#order-wrap .thum:last-child li {
	list-style: initial;
	margin-bottom: 1rem;
}
#order-wrap .thum:last-child span {
	display: inline;
}
#my-info {
	padding: 5rem 0;
}
#info-wrap > a {
	width: 30%;
	padding: 3rem 0;
	text-align: center;
	border: 1px solid #ccc;
}
.image {
	width: 20%;
}
#info-wrap > a > h4 {
	margin: 1rem;
}
#info-wrap > a > span {
	display: block;
	margin-bottom: 2rem;
}
</style>
