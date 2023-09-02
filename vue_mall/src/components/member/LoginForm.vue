<template>
	<section class="form-wrap">
		<h4 class="form-title">LOGIN</h4>
		<form>
			<div class="border-bottom">
				<label for="id-field">ID</label>
				<input
					:value="id"
					@input="$emit('update:id', $event.target.value)"
					v-focus
					id="id-field"
					class="outline-none"
					type="text"
				/>
			</div>
			<div class="border-bottom">
				<label for="password-field">PW</label>
				<input
					:value="password"
					@input="$emit('update:password', $event.target.value)"
					id="password-field"
					class="outline-none"
					type="password"
				/>
			</div>
			<div class="flex-box around">
				<article>
					<input
						:checked="saveInfo"
						@change="$emit('update:saveInfo', !saveInfo)"
						type="checkbox"
					/>
					<span>REMEBER ME</span>
				</article>
				<article>
					<button
						:disabled="disabled"
						class="hover-green submit-button outline-none"
					>
						SIGN IN
					</button>
				</article>
			</div>
		</form>
		<p id="find-member-info">
			<a class="hover-green">Did You Forget Your ID</a>
			<span class="bold">or</span>
			<a class="hover-green">Password?</a>
		</p>
	</section>
</template>

<script setup>
import { computed } from 'vue';
import { validateId, validatePassword } from '@/utils/validation.js';

const props = defineProps({
	id: String,
	password: String,
	saveInfo: Boolean,
});
defineEmits(['update:id', 'update:password', 'update:saveInfo']);
const disabled = computed(() => {
	return !validateId(props.id) || !validatePassword(props.password);
});
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
</style>
