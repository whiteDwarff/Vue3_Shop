<template>
	<section>
		<!-- 주문하는 고객 정보 -->
		<article id="orderer">
			<h3>주문자</h3>
			<div>
				<span>이름</span>
				<input type="text" />
				<!-- validation -->
				<span></span>
			</div>
			<div>
				<span>연락처</span>
				<input type="number" />
				<!-- validation -->
				<span></span>
			</div>
			<div>
				<span>이메일</span>
				<input type="text" />
				<!-- validation -->
				<span></span>
			</div>
		</article>
		<!-- 배송지 정보 -->
		<article id="shipping">
			<h3>배송지</h3>
			<div>
				<span>이름</span>
				<input type="text" />
				<!-- validation -->
				<span></span>
			</div>
			<!-- 우편번호 포함 -->
			<div>
				<span>연락처</span>
				<input type="number" />
				<!-- validation -->
				<span></span>
			</div>
		</article>
	</section>
</template>

<script>
export default {
	setup() {
		return {};
	},
};
</script>

<style lang="scss" scoped></style>
