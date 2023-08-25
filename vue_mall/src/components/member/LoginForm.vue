<template>
	<section>
		<h4>LOGIN</h4>
		<form>
			<div class="border-bottom">
				<label for="id-field">ID</label>
				<input
					:value="id"
					@input="$emit('update:id', $event.target.value)"
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
					<button class="hover-green submit-button outline-none">
						SIGN IN
					</button>
				</article>
			</div>
		</form>
		<p id="find-member-info">
			<router-link to="''" class="hover-green"
				>Did You Forget Your ID</router-link
			>
			<span class="bold">or</span>
			<router-link to="''" class="hover-green">Password?</router-link>
		</p>
	</section>
</template>

<script setup>
defineProps({
	id: String,
	password: String,
	saveInfo: Boolean,
});
defineEmits(['update:id', 'update:password', 'update:saveInfo']);
</script>

<style lang="scss" scoped></style>
