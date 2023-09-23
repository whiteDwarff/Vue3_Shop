import { defineStore } from 'pinia';
import { getProductList } from '@/api/';
export const useProductStore = defineStore('product', {
	state: () => ({
		products: [],
		product: {},
	}),

	actions: {
		// 상품 리스트 조회
		async fetchedProduct() {
			const { data } = await getProductList();
			try {
				this.products = data.reverse();
			} catch (err) {
				console.log(err.message);
			}
		},
		// ------------------------------------------------------------------
		// async fetchedItem(id) {
		// 	try {
		// 		const data = await getPostById(id);
		// 		this.product = data;
		// 	} catch (err) {
		// 		console.log(err.message);
		// 	}
		// },
		// ------------------------------------------------------------------
		// 하나의 상품 조회
		fetchedItem(id) {
			this.products.forEach(item => {
				if (item.id == id) this.product = item;
			});
		},
		// 선택한 사이즈 갱신
		replaceItemSelect() {
			this.products.forEach(item => {
				item.stock.forEach(el => {
					if (el.select) el.select = 0;
				});
			});
		},
	},
});
