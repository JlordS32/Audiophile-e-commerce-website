import data from '../data/data.json';

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
