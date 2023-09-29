<template>
	<section class="wrap">
		<h4 class="form-title">LOGIN</h4>
		<form @submit.prevent="login">
			<div class="border-bottom">
				<label for="id-field">ID</label>
				<input
					v-focus
					v-model.trim="loginInfo.id"
					id="id-field"
					class="outline-none"
					type="text"
				/>
				<small v-if="idInputMsg !== true" class="font-grey">{{
					idInputMsg
				}}</small>
			</div>
			<div class="border-bottom">
				<label for="password-field">PW</label>
				<input
					v-model.trim="loginInfo.password"
					id="password-field"
					class="outline-none"
					type="password"
				/>
				<small v-if="pwdInputMsg !== true" class="font-grey">{{
					pwdInputMsg
				}}</small>
			</div>
			<div class="flex-box around">
				<article>
					<input v-model="loginInfo.session" type="checkbox" />
					<span>REMEBER ME</span>
				</article>
				<article>
					<button
						:disabled="!isValidateState"
						class="hover-green submit-button outline-none"
					>
						LOGIN
					</button>
				</article>
			</div>
		</form>
		<p id="find-member-info">
			<router-link to="/findInfo" class="hover-green"
				>Did You Forget Your ID</router-link
			>
			<span class="bold">or</span>
			<router-link to="/findPasswordInfo" class="hover-green"
				>Password?</router-link
			>
		</p>
	</section>
</template>

<script setup>
import { computed, ref } from 'vue';
import { validateId, validatePassword } from '@/utils/validation';
import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const loginInfo = ref({
	id: null,
	password: null,
	session: false,
});
// -----------------------------------------------------------
const idInputMsg = computed(() => {
	return validateId(loginInfo.value.id)
		? true
		: '아이디는 소문자와 숫자를 포함한 6-14글자로 입력해주세요.';
});
const pwdInputMsg = computed(() => {
	return validatePassword(loginInfo.value.password)
		? true
		: '비밀번호는 대소문자와 특수기호, 숫자를 포함한 7-14글자로 작성해주세요.';
});
// -----------------------------------------------------------
const isValidateState = computed(
	() =>
		validateId(loginInfo.value.id) &&
		validatePassword(loginInfo.value.password),
);
// -----------------------------------------------------------
const store = useUserInfoStore();
const { loginUser } = storeToRefs(store);

const router = useRouter();
const login = () => {
	if (store.checkedLoginInfo(loginInfo.value)) {
		loginUser.value = loginInfo;
		if (loginUser.value.session) store.savedLoginInfo();

		router.push({ name: 'products' });
	} else if (!store.checkedLoginInfo(loginInfo.value)) {
		alert('로그인 정보가 일치하지 않습니다.');
		loginInfo.value.id = null;
		loginInfo.value.password = null;
		loginInfo.value.session = false;
	}
};
</script>

<style scoped>
label {
	font-size: 1.2rem;
	display: inline-block;
	width: 15%;
}
.border-bottom input {
	font-size: 14px;
	width: 40%;
}
.flex-box,
#find-member-info {
	font-size: 1.2rem;
}
.flex-box article:first-child {
	display: flex;
	align-items: center;
}
.flex-box article:first-child span {
	display: block;
	margin-left: 1rem;
}
#find-member-info {
	margin-top: 8rem;
}
.font-grey {
	color: #838383;
}
</style>
