import axios from 'axios';

function getProductList() {
	const response = axios.get('/src/api/product.json');
	return response;
}
export { getProductList };
