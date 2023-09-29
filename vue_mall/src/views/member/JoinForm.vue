<template>
	<section class="wrap">
		<h4 class="form-title">{{ $route.params.title }}</h4>
		<form @submit.prevent="createAccount">
			<div class="border-bottom">
				<label for="id-field"
					><i class="fa-sharp fa-regular fa-asterisk fa-2xs" />ID
				</label>
				<!-- Object.keys(loginUser.value).length !== 0 -->
				<input
					v-model="nonMemberInfo.id"
					:disabled="Object.keys(loginUser).length !== 0"
					v-focus
					id="id-field"
					class="outline-none"
					type="text"
				/>
				<small v-if="idInputMsg !== true" class="font-grey">{{
					idInputMsg
				}}</small>
			</div>
			<div class="border-bottom">
				<label for="password-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs" />
					PW
				</label>
				<input
					v-model="nonMemberInfo.password"
					id="password-field"
					class="outline-none"
					type="password"
				/>
				<small v-if="pwdInputMsg !== true" class="font-grey">{{
					pwdInputMsg
				}}</small>
			</div>
			<div class="border-bottom">
				<label for="password-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs" />PW CHECK</label
				>
				<input
					v-model="checkedPassword"
					id="password-check"
					class="outline-none"
					type="password"
				/>
				<small v-if="pwdCheckMsg !== true" class="font-grey">{{
					pwdCheckMsg
				}}</small>
			</div>
			<div class="border-bottom">
				<label for="name-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs"></i>
					NAME
				</label>
				<input
					v-model="nonMemberInfo.name"
					:disabled="Object.keys(loginUser).length !== 0"
					id="name-field"
					class="outline-none"
					type="text"
				/>
			</div>
			<!-- tel-box -->
			<div class="border-bottom" id="tel-box">
				<label for="id-field">MOBILE</label>
				<select v-model="nonMemberInfo.tel.firstTel" class="input-width">
					<option value="010">010</option>
					<option value="011">011</option>
					<option value="016">016</option>
					<option value="017">017</option>
					<option value="018">018</option>
					<option value="019">019</option>
				</select>
				<span class="hyphen">-</span>
				<input
					v-model="nonMemberInfo.tel.middleTel"
					class="outline-none"
					type="text"
					id="middle-number"
					minlength="3"
					maxlength="4"
				/>
				<span class="hyphen">-</span>
				<input
					v-model="nonMemberInfo.tel.lastTel"
					class="outline-none"
					type="text"
					id="last-number"
					minlength="3"
					maxlength="4"
				/>
			</div>
			<!-- post box -->
			<PostFrom
				v-model:postCode="nonMemberInfo.post.postCode"
				v-model:adress="nonMemberInfo.post.adress"
				v-model:detailAdress="nonMemberInfo.post.detailAdress"
				v-model:extraAdress="nonMemberInfo.post.extraAdress"
				@onPosted="execPostcode(nonMemberInfo.post)"
			/>
			<!-- email -->
			<div class="border-bottom">
				<label for="email-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs"></i>
					E MAIL
				</label>
				<input
					v-model="nonMemberInfo.email"
					id="email-field"
					class="outline-none"
					type="text"
				/>
				<small v-if="emailInputMsg !== true" class="font-grey">{{
					emailInputMsg
				}}</small>
			</div>

			<button
				:disabled="!disabled"
				class="hover-green submit-button outline-none"
			>
				{{ Object.keys(loginUser).length !== 0 ? 'UPDATE' : 'JOIN US' }}
			</button>
		</form>
	</section>
</template>

<script setup>
import { computed, ref } from 'vue';
import PostFrom from '@/components/payment/PostForm.vue';
import execPostcode from '@/utils/post.js';
import {
	validateId,
	validatePassword,
	validateEmail,
} from '@/utils/validation.js';
import { useRouter } from 'vue-router';
import { useUserInfoStore } from '@/store/user';
import { storeToRefs } from 'pinia';

// ------------------ store 정의
const store = useUserInfoStore();
// ------------------ store 객체 가져오기
const { loginUser } = storeToRefs(store);
const { accountInfo } = storeToRefs(store);
const nonMemberInfo = ref({});

// -----------------------------------------------------------
const a = defineProps({
	title: String,
});
console.log(a.title);
// -----------------------------------------------------------
if (Object.keys(loginUser.value).length !== 0) {
	nonMemberInfo.value = {
		id: accountInfo.value.id,
		password: '',
		name: accountInfo.value.name,
		tel: {
			firstTel: '010',
			middleTel: accountInfo.value.tel.middleTel,
			lastTel: accountInfo.value.tel.lastTel,
		},
		post: {
			postCode: accountInfo.value.post.postCode,
			adress: accountInfo.value.post.adress,
			detailAdress: accountInfo.value.post.detailAdress,
			extraAdress: accountInfo.value.post.extraAdress,
		},
		email: accountInfo.value.email,
		point: 1000,
	};
} else {
	nonMemberInfo.value = {
		id: '',
		password: '',
		name: '',
		tel: {
			firstTel: '010',
			middleTel: null,
			lastTel: null,
		},
		post: { postCode: '', adress: '', detailAdress: '', extraAdress: '' },
		email: '',
		point: 1000,
	};
}

const checkedPassword = ref(null);
// -----------------------------------------------------------
const idInputMsg = computed(() => {
	return validateId(nonMemberInfo.value.id)
		? true
		: '아이디는 소문자와 숫자를 포함한 6-14글자로 입력해주세요.';
});
const pwdInputMsg = computed(() =>
	validatePassword(nonMemberInfo.value.password)
		? true
		: '비밀번호는 대소문자와 특수기호, 숫자를 포함한 7-14글자로 작성해주세요.',
);
const pwdCheckMsg = computed(() => {
	return nonMemberInfo.value.password !== checkedPassword.value
		? '비밀번호가 일치하지 않습니다.'
		: true;
});
const emailInputMsg = computed(() => {
	return validateEmail(nonMemberInfo.value.email)
		? true
		: '올바른 이메일 형식이 아닙니다.';
});
// -----------------------------------------------------------
const disabled = computed(() => {
	return (
		validateId(nonMemberInfo.value.id) &&
		validatePassword(nonMemberInfo.value.password) &&
		nonMemberInfo.value.password === checkedPassword.value &&
		validateEmail(nonMemberInfo.value.email) &&
		!nonMemberInfo.value.name == ''
	);
});
// -----------------------------------------------------------
const router = useRouter();
const createAccount = () => {
	// ------------------ store 객체에 값 할당
	accountInfo.value = nonMemberInfo;
	// ------------------ localStorage에 회원정보 저장
	if (Object.keys(loginUser.value).length !== 0) {
		store.updateUserInfo();
		alert('회원정보가 수정되었습니다.');
		router.push({ name: 'myshop' });
	} else {
		store.savedUserInfo();
		alert('회원가입이 완료되었습니다. 로그인 후 이용해주새요.');
		router.push({ name: 'login' });
	}
};
</script>

<style scoped>
.fa-sharp {
	display: inline-block;
	width: 2px;
	color: rgb(141, 4, 4);
	margin-right: 1rem;
}
#tel-box {
	display: flex;
	align-items: center;
}
.input-width,
#middle-number,
#last-number {
	width: 15%;
	height: 2rem;
}
.hyphen {
	margin: 0 0.5rem;
}
.submit-button {
	margin: 0 0 3rem auto;
	display: block;
}
.font-grey {
	color: #838383;
}
</style>
