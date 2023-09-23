<script setup>
// ------------------------------------------------------------
import AppHeader from '@/views/AppHeader.vue';
import { useProductStore } from '@/store/product.js';

const store = useProductStore();
store.fetchedProduct();
</script>

<template>
	<div>
		<AppHeader />
		<router-view></router-view>
	</div>
</template>

<style>
section {
	width: 80%;
}
* {
	margin: 0;
	padding: 0;
	color: #000;
	list-style: none;
	font-weight: normal;
}
html {
	font-size: 10px;
}
a {
	text-decoration: none;
}
.form-wrap {
	width: 50%;
	margin: 22rem auto 0 auto;
}
.wrap {
	width: 50%;
	margin: 22rem auto 0 auto;
}
.product-wrap {
	width: 60%;
	margin: 16rem auto 0 auto;
}
.form-title {
	font-size: 1.5rem;
	font-weight: bold;
	margin-bottom: 8rem;
}
.border-bottom {
	border-bottom: 1px solid #000;
	margin-bottom: 3rem;
}
.border-grey {
	border-bottom: 1px solid #bbb;
}
label {
	font-size: 1.2rem;
	display: inline-block;
	width: 15%;
}
.border-bottom input {
	font-size: 14px;
	width: 40%;
}
.outline-none {
	border: none;
	outline: none;
}
.flex-box {
	display: flex;
}
.center {
	justify-content: center;
}
.around {
	justify-content: space-around;
}
.space-between {
	justify-content: space-between;
}
.align-center {
	align-items: baseline;
}
.align-bottom {
	align-items: baseline;
}
.submit-button {
	background-color: #fff;
	font-size: 1.3rem;
}
#find-member-info {
	text-align: center;
	width: 50%;
	margin: 0 auto;
}
#find-member-info > span {
	margin: 0 10px;
}
.bold {
	font-weight: bold;
}
.hover-green:hover {
	color: #f00;
	cursor: pointer;
}
.pointer {
	cursor: pointer;
}
.font-label {
	font-size: 1.2rem;
}
.font {
	font-size: 1.5rem;
}
.blue {
	color: #3971ff;
}
.red {
	color: #f00;
}
.grey {
	color: rgb(88, 88, 88);
}
.ccc {
	color: #ccc;
}
.order-date {
	width: 20%;
	text-align: center;
	margin: auto 0;
}
.order-state {
	width: 10%;
	margin: auto 0;
}
.sub-title {
	margin-bottom: 2rem;
}
</style>
