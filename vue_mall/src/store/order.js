import { defineStore } from 'pinia';

export const useOrderListStore = defineStore('orderList', {
	state: () => ({
		orderList: [],
		orderInfo: {},
	}),
	getters: {},
	actions: {
		fetchedOrderInfo(id) {
			this.orderList.forEach(el => {
				if (el.id === parseInt(id)) {
					this.orderInfo = el;
				}
			});
		},
	},
});
