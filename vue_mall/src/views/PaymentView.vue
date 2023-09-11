<template>
	<section style="margin: 30%">
		<!-- 주문하는 고객 정보 -->
		<!-- <OrdererForm
			v-model:name="orderer.name"
			v-model:tel="orderer.tel"
			:orderer="'주문자'"
			>
			<template #footer>
				<div>
					<span>이메일</span>
					<input v-model="orderer.email" type="text" />
					<span></span>
				</div>
			</template>
		</OrdererForm> -->
		<!-- 배송지 정보 -->
		<article id="shipping">
			<OrdererForm
				v-model:name="recipient.name"
				v-model:tel="recipient.tel"
				:orderer="'배송지'"
			>
				<template #footer>
					<div>
						<!-- 배송지 추가 -->
						<PostForm
							v-model:postCode="post.postCode"
							v-model:adress="post.adress"
							v-model:detailAdress="post.detailAdress"
							v-model:extraAdress="post.extraAdress"
							@onPosted="execPostcode(post)"
						/>
					</div>
				</template>
			</OrdererForm>
		</article>
		<ProductLabel />
	</section>
</template>

<script setup>
import ProductLabel from '@/components/product/ProductLabel.vue';
import OrdererForm from '@/components/payment/OrdererForm.vue';
import PostForm from '@/components/payment/PostForm.vue';
import execPostcode from '@/utils/post.js';
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
// ------------------------------------------------------------------
const { product } = history.state;
console.log(product);

// 주문자 정보
const orderer = ref({
	name: '',
	tel: '',
	email: '',
});
// ------------------------------------------------------------------
const recipient = ref({
	name: '',
	tel: '',
	post: '',
});
const post = ref({
	postCode: '',
	adress: '',
	detailAdress: '',
	extraAdress: '',
});
</script>

<style lang="scss" scoped></style>
