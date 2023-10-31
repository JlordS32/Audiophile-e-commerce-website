import data from '../data/data.json';

// types

interface CartType {
	item: string;
	quantity: number;
}

export function formatCurrency(amount: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(amount);
}

export function getBestRecommended(selectedProduct: string) {
	const newData = data.filter((item) => item.slug !== selectedProduct);

	// Shuffle the filteredData array
	const shuffledData = newData.sort(() => 0.5 - Math.random());

	// Get the first 3 elements from the shuffledData array
	const randomData = shuffledData.slice(0, 3);

	return randomData;
}

export function createCart(cart: CartType[]): void {
	localStorage.setItem('cart', JSON.stringify(cart));
}

export function fetchData(key: string) {
	return JSON.parse(localStorage.getItem(key) as string);
}

export function deleteCart() {
	localStorage.removeItem('cart');
}