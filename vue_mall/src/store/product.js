import { defineStore } from 'pinia';
import { getProductList, getPostById } from '@/api/';
export const useProductStore = defineStore('product', {
	state: () => ({
		products: [],
		product: {},
	}),
	getters: {
		labelImage(state) {
			return state.product.detailImage[0];
		},
	},
	actions: {
		// 상품 리스트 조회
		async fetchedProduct() {
			const { data } = await getProductList();
			try {
				this.products = data;
			} catch (err) {
				console.log(err.message);
			}
		},
		// ------------------------------------------------------------------
		// 하나의 상품 조회
		async fetchedItem(id) {
			try {
				const data = await getPostById(id);
				this.product = data;
			} catch (err) {
				console.log(err.message);
			}
		},
		// ------------------------------------------------------------------
	},
});
