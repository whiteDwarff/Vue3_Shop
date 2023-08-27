import axios from 'axios';

function getProductList() {
	const response = axios.get('/src/api/product.json');
	return response;
}

async function getPostById(id) {
	const { data } = await getProductList();
	return data.find(item => item.id === id);
}

export { getProductList, getPostById };
