import { defineStore } from 'pinia';

export const useUserInfoStore = defineStore('user', {
	state: () => ({
		loginInfo: {
			id: null,
			pwd: null,
		},
		accountInfo: {
			id: null,
			pwd: null,
			name: null,
			tel: {},
			post: {},
			email: null,
		},
	}),
	getters: {},
	actions: {},
});
