import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('user', {
	state: () => ({
		loginUser: {
			id: null,
			password: null,
			session: null,
		},
		accountInfo: JSON.parse(localStorage.getItem('user')) || {},
	}),
	getters: {},
	actions: {
		savedUserInfo() {
			localStorage.setItem('user', JSON.stringify(this.accountInfo));
		},
		checkedLoginInfo({ id, password }) {
			if (
				id === this.accountInfo.id &&
				password === this.accountInfo.password
			) {
				return true;
			} else if (
				id !== this.accountInfo.id ||
				password !== this.accountInfo.password
			)
				return false;
		},
	},
});
