<script setup>
// ------------------------------------------------------------
import AppHeader from '@/views/AppHeader.vue';
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
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
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
.outline-none {
	border: none;
	outline: none;
}
.flex-box {
	display: flex;
}
.around {
	justify-content: space-around;
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
</style>
