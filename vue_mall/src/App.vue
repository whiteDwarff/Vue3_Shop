<script setup>
import LoginForm from '@/components/member/LoginForm.vue';
import { validationPassword } from '@/utils/validation.js';
import { ref } from 'vue';

const memberInfo = ref({
	id: null,
	password: null,
	isSaveLoginInfo: false,
});

const login = () => {
	if (!memberInfo.value.id) alert('아이디 항목은 필수 입력값입니다.');
	else if (!memberInfo.value.password)
		alert('비밀번호 항목은 필수 입력값입니다.');
	else if (!validationPassword(memberInfo.value.password))
		alert('비밀번호는 대소문자, 숫자 및 특수문자를 포함해야함');
};
</script>

<template>
	<div>
		<LoginForm
			@submit.prevent="login"
			v-model:id.trim="memberInfo.id"
			v-model:password.trim="memberInfo.password"
			v-model:saveInfo="memberInfo.isSaveLoginInfo"
		/>
		{{ memberInfo.id }}<br />
		{{ memberInfo.password }}<br />
		{{ memberInfo.isSaveLoginInfo }}
	</div>
</template>

<style>
* {
	margin: 0;
	padding: 0;
	color: #000;
	list-style: none;
	font-weight: normal;
}
.border-bottom {
	border-bottom: 1px solid #000;
}
.outline-none {
	border: none;
}
.flex-box {
	display: flex;
}
.around {
	justify-content: space-around;
}
.submit-button {
	background-color: #fff;
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
	color: #b4fcbe;
	cursor: pointer;
}
</style>
