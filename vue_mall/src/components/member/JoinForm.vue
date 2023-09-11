<template>
	<section class="form-wrap">
		<h4 class="form-title">CREATE ACCOUNT</h4>
		<form>
			<div class="border-bottom">
				<label for="id-field"
					><i class="fa-sharp fa-regular fa-asterisk fa-2xs" />ID
				</label>
				<input
					:value="id"
					@input="$emit('update:id', $event.target.value)"
					v-focus
					id="id-field"
					class="outline-none"
					type="text"
				/>
				<small class="font-grey">{{ idInputMsg }}</small>
			</div>
			<div class="border-bottom">
				<label for="password-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs" />
					PW
				</label>
				<input
					:value="pwd"
					@input="$emit('update:pwd', $event.target.value)"
					id="password-field"
					class="outline-none"
					type="password"
				/>
				<small class="font-grey">{{ pwdInputMsg }}</small>
			</div>
			<div class="border-bottom">
				<label for="password-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs" />PW CHECK</label
				>
				<input
					:value="pwdCheck"
					@input="$emit('update:pwdCheck', $event.target.value)"
					id="password-check"
					class="outline-none"
					type="password"
				/>
				<small class="font-grey">{{ pwdCheckMsg }}</small>
			</div>
			<div class="border-bottom">
				<label for="name-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs"></i>
					NAME
				</label>
				<input
					:value="name"
					@input="$emit('update:name', $event.target.value)"
					id="name-field"
					class="outline-none"
					type="text"
				/>
			</div>
			<div class="border-bottom" id="tel-box">
				<label for="id-field">MOBILE</label>
				<select
					:value="firstNumber"
					@change="$emit('update:firstNumber', $event.target.value)"
					class="input-width"
				>
					<option value="010">010</option>
					<option value="011">011</option>
					<option value="016">016</option>
					<option value="017">017</option>
					<option value="018">018</option>
					<option value="019">019</option>
				</select>
				<span class="hyphen">-</span>
				<input
					:value="middleNumber"
					@input="$emit('update:middleNumber', $event.target.value)"
					class="outline-none"
					type="text"
					id="middle-number"
				/>
				<span class="hyphen">-</span>
				<input
					:value="lastNumber"
					@input="$emit('update:lastNumber', $event.target.value)"
					class="outline-none"
					type="text"
					id="last-number"
				/>
			</div>
			<div class="border-bottom">
				<label for="email-field">
					<i class="fa-sharp fa-regular fa-asterisk fa-2xs"></i>
					E MAIL
				</label>
				<input
					:value="email"
					@input="$emit('update:email', $event.target.value)"
					id="email-field"
					class="outline-none"
					type="text"
				/>
				<small class="font-grey">{{ emailInputMsg }}</small>
			</div>
			<button
				:disabled="disabled"
				class="hover-green submit-button outline-none"
			>
				JOIN US
			</button>
		</form>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import {
	validateId,
	validatePassword,
	validateEmail,
} from '@/utils/validation.js';

const props = defineProps({
	id: String,
	pwd: String,
	pwdCheck: String,
	name: String,
	firstNumber: String,
	middleNumber: String,
	lastNumber: String,
	email: String,
});
defineEmits([
	'update:id',
	'update:pwd',
	'update:pwdCheck',
	'update:name',
	'update:firstNumber',
	'update:middleNumber',
	'update:lastNumber',
	'update:email',
]);
const idInputMsg = computed(() => {
	return validateId(props.id)
		? ''
		: '아이디는 소문자와 숫자를 포함한 6-12글자로 입력해주세요.';
});
const pwdInputMsg = computed(() =>
	validatePassword(props.pwd)
		? ''
		: '비밀번호는 대소문자와 특수기호, 숫자를 포함한 7-14글자로 작성해주세요.',
);
const pwdCheckMsg = computed(() => {
	return props.pwd !== props.pwdCheck ? '비밀번호가 일치하지 않습니다.' : '';
});
const emailInputMsg = computed(() => {
	return validateEmail(props.email) ? '' : '올바른 이메일 형식이 아닙니다.';
});
const disabled = computed(() => {
	return (
		!validateId(props.id) ||
		!validatePassword(props.pwd) ||
		props.pwdCheck !== props.pwd ||
		!validateEmail(props.email) ||
		!props.name
	);
});
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
