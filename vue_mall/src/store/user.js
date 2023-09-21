import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('user', {
	state: () => ({
		loginUser: {
			id: '',
			password: '',
			session: false,
		},
		accountInfo: JSON.parse(localStorage.getItem('user')) || {},
	}),
	getters: {
		totalAdress(state) {
			const post = state.accountInfo.post;
			return `[${post.postCode}] ${post.adress} ${post.detailAdress} ${post.extraAdress}`;
		},
		totalTel(state) {
			const tel = state.accountInfo.tel;
			return `${tel.firstTel}-${tel.middleTel}-${tel.lastTel}`;
		},
	},
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
